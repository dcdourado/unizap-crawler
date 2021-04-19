import puppeteer from "puppeteer";
import Logger from "../logger.js";

const CPF = "ABBABA";
const PASSWORD = "BALBALA";

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(process.env.SIGAA_LOGIN_URL);

    // Login
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

    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Access courses data
    await page.hover("table[summary='main menu'] > tbody > tr > td");
    await page.hover("table[summary='sub menu'] > tbody > tr:last-child");

    Logger.info("Finding courses TR...");
    const [coursesTr] = await page.$x(
      "//td[contains(text(), 'Consultar Curso')]"
    );
    Logger.info("Found!");
    await coursesTr.click();
    Logger.info("Clicked");

    await page.waitForNavigation({ waitUntil: "networkidle0" });
  } catch (e) {
    Logger.error(e);
  }

  await page.screenshot({ path: "result.png" });
  await browser.close();
};

export default command;
