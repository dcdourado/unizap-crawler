import puppeteer from "puppeteer";

import Logger from "../logger.js";
import Helpers from "./helpers/index.js";

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await Helpers.login(page);
    await Helpers.curricularStructure(page);

    Logger.info("Retrieving couses...");
    const courses = await page.evaluate(() => {
      const options = Array.from(
        document.querySelectorAll("[name='busca:curso'] > option")
      );

      return options.map((opt) => {
        const values = opt.textContent.split("-");
        const courseAndGroup = values[0].split("/");

        const id = +opt.value;
        const name = (courseAndGroup[0] || "").trim();
        const group = (courseAndGroup[1] || "").trim();
        const city = (values[1] || "").trim();
        const type = (values[2] || "").trim();

        return { id, name, group, city, type };
      });
    });
    courses.shift(); // Ignore value 0 (select option)
    Logger.info("Courses retrieved successfully");

    // Logger.log(courses);
  } catch (e) {
    Logger.error(e);
  }

  await browser.close();
};

export default command;
