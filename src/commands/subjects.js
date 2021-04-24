import puppeteer from "puppeteer";

import Services from "../services/index.js";
import Database from "../database/index.js";
import Helpers from "./helpers/index.js";

const { Logger } = Services;

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let course;
  let subjects = [];

  try {
    course = await Database.Courses.findOldest();
  } catch (e) {
    Logger.error(e);
  }

  if (course === undefined) {
    Logger.warn("Could not fetch oldest course");
  } else {
    Logger.info(`Found ${course.name} course`);
  }

  try {
    await Helpers.login(page);
    await Helpers.curricularStructure(page, course);

    subjects = await page.$$eval(
      "#relatorio > table > tbody > tr:nth-child(12) > td > table > tbody > tr",
      (trs) => {
        let period = -1; // Because it sums on first, so the starting value is zero;

        return trs
          .map((tr) => {
            if (tr.className === "tituloRelatorio") {
              period++;
              return;
            } else if (tr.className !== "componentes") {
              return;
            }

            const acronym = tr.children[0].textContent;

            const nameAndWorkload = tr.children[1].textContent.split("-");

            const workload = +nameAndWorkload[nameAndWorkload.length - 1]
              .trim()
              .slice(0, -1);

            nameAndWorkload.pop();
            const name = nameAndWorkload.join().trim();

            return {
              period,
              acronym,
              name,
              workload,
            };
          })
          .filter((sub) => sub !== undefined);
      }
    );
  } catch (e) {
    Logger.error(e);
  }

  await browser.close();

  try {
    const insertedSubjects = await Database.Subjects.upsert(subjects);

    const courseSubjects = insertedSubjects
      .map((iS) => {
        const relatedSubject = subjects.find((s) => s.acronym === iS.acronym);

        if (relatedSubject === undefined) {
          Logger.warn(
            `Could not find a subject inside 'insertedSubjects' with acronym ${iS.acronym}`
          );

          return;
        }

        return {
          ...iS,
          period: relatedSubject.period,
        };
      })
      .filter((pS) => pS !== undefined);

    await Database.Courses.syncSubjects(course, courseSubjects);
  } catch (e) {
    Logger.error(e);
  }
};

export default command;
