import Services from "../../services/index.js";

const { Logger } = Services;

const command = async (page) => {
  Logger.info(`Accessing ${process.env.SIGAA_LOGIN_URL}...`);

  await page.goto(process.env.SIGAA_LOGIN_URL);
  Logger.info("Website accessed successfully");

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
  // await page.$eval("[value='Entrar']", (el) => el.click());
  // Logger.info("Clicked sign in button");

  // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await Promise.all([
    page.click("[value='Entrar']"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
  Logger.info("Logged in successfully");
};

export default command;
