import puppeteer from "puppeteer";

const command = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(process.env.SIGAA_LOGIN_URL);

  await page.$eval("[name='user.login']", (el) => (el.value = "Teste"));

  await page.screenshot({ path: "result.png" });
  await browser.close();
};

export default command;
