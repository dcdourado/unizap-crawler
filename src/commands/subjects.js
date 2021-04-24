import puppeteer from "puppeteer";

import Services from "../services/index.js";
import Database from "../database/index.js";
import Helpers from "./helpers/index.js";

const { Logger } = Services;

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let subjects = [];

  try {
    const course = await Database.Courses.findOldest();

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
    await Database.Subjects.upsert(subjects);
  } catch (e) {
    Logger.error(e);
  }
};

export default command;
