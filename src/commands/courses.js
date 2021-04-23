import puppeteer from "puppeteer";

import Logger from "../logger.js";
import LoginHelper from './helpers/login.js';

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await LoginHelper(page);

    // Access courses section
    Logger.info("Accessing courses section...");

    await page.hover("table[summary='main menu'] > tbody > tr > td");
    await page.hover("table[summary='sub menu'] > tbody > tr:last-child");

    const [coursesTr] = await page.$x(
      "//td[contains(text(), 'Consultar Estrutura Curricular')]"
    );
    await coursesTr.click();

    await page.waitForNavigation({ waitUntil: "load" });

    Logger.info("Courses section accessed successfully...");

    // Select and submit course
    await page.$eval("[name='busca:checkCurso']", (el) => el.click());

    // const optionsContainer = await page.$("[name='busca:curso']", (el) => el.children);
    const courses = await page.evaluate(() => {
      const options = Array.from(
        document.querySelectorAll("[name='busca:curso'] > option")
      );

      return options.map((opt) => {
        const values = opt.textContent.split("-");
        const courseAndGroup = values[0].split("/");

        const id = +opt.value;
        const name = (courseAndGroup[0] || '').trim();
        const group = (courseAndGroup[1] || '').trim();
        const city = (values[1] || '').trim();
        const type = (values[2] || '').trim();

        return { id, name, group, city, type };
      });
    });
    courses.shift(); // Ignore value 0 (select option)

    Logger.log(courses);
  } catch (e) {
    Logger.error(e);
  }

  await browser.close();
};

export default command;
