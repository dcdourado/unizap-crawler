import puppeteer from "puppeteer";

import Logger from "../logger.js";

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    Logger.info(`Accessing ${process.env.SIGAA_LOGIN_URL}...`);
    await page.goto(process.env.SIGAA_LOGIN_URL);
    Logger.info("Website accessed successfully");

    // Login
    Logger.info("Logging in...");

    await page.$eval(
      "[name='user.login']",
      (el, login) => (el.value = `${login}`),
      [process.env.SIGAA_LOGIN_CPF]
    );
    await page.$eval(
      "[name='user.senha']",
      (el, password) => (el.value = `${password}`),
      [process.env.SIGAA_LOGIN_PASSWORD]
    );
    await page.$eval("[value='Entrar']", (el) => el.click());

    Logger.info("Clicked sign in button");

    await page.waitForNavigation({ waitUntil: "load" });

    Logger.info("Logged in successfully");

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
    const coursesValues = await page.evaluate(() => {
      const options = Array.from(
        document.querySelectorAll("[name='busca:curso'] > option")
      );

      return options.map((opt) => opt.value);
    });
    coursesValues.shift(); // Ignore value 0 (select option)

    // Retrieving subjects
    const subjectPromises = coursesValues.map(async (cv) => {
      await page.$eval("[name='busca:curso']", (el, cv) => (el.value = cv), [
        cv,
      ]);

      await page.$eval("[value='Buscar']", (el) => el.click());

      // await page.$eval(".listagem > tbody > tr > td > a", (el) => el.click());
      await page.screenshot({ path: `${cv}.png` });
    });

    await Promise.all(subjectPromises);
  } catch (e) {
    Logger.error(e);
  }

  await page.screenshot({ path: "result.png" });
  await browser.close();
};

export default command;
