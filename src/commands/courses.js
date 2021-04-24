import puppeteer from "puppeteer";

import Services from "../services/index.js";
import Database from "../database/index.js";
import Helpers from "./helpers/index.js";

const { Logger } = Services;

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let courses = [];

  try {
    await Helpers.login(page);
    await Helpers.curricularStructure(page);

    Logger.info("Retrieving couses...");
    const updatedCourses = await page.evaluate(() => {
      const options = Array.from(
        document.querySelectorAll("[name='busca:curso'] > option")
      );

      return options.map((opt) => {
        const values = opt.textContent.split("-");
        const courseAndInstitute = values[0].split("/");

        const code = +opt.value;
        const name = (courseAndInstitute[0] || "").trim();
        const institute = (courseAndInstitute[1] || "").trim();
        const city = (values[1] || "").trim();
        const type = (values[2] || "").trim();

        return { code, name, institute, city, type };
      });
    });
    updatedCourses.shift(); // Ignore value 0 (select option)
    Logger.info("Courses retrieved successfully");

    courses = updatedCourses;
  } catch (e) {
    Logger.error(e);
  }

  await browser.close();

  try {
    await Database.Courses.persist(courses);
  } catch (e) {
    Logger.error(e);
  }

  return true;
};

export default command;
