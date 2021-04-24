import puppeteer from "puppeteer";

import Services from "../services/index.js";
import Database from "../database/index.js";
import Helpers from "./helpers/index.js";

const { Logger } = Services;

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const course = await Database.Courses.findOldest();

    await Helpers.login(page);
    await Helpers.curricularStructure(page, course);

    await page.screenshot({ path: "result.png" });
  } catch (e) {
    Logger.error(e);
  }

  await browser.close();
};

export default command;
