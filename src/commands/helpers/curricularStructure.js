import Services from "../../services/index.js";

const { Logger } = Services;

const command = async (page) => {
  Logger.info("Accessing courses section...");

  await page.hover("table[summary='main menu'] > tbody > tr > td");
  await page.hover("table[summary='sub menu'] > tbody > tr:last-child");

  const [coursesTr] = await page.$x(
    "//td[contains(text(), 'Consultar Estrutura Curricular')]"
  );
  await coursesTr.click();

  await page.waitForNavigation({ waitUntil: "load" });
  Logger.info("Courses section accessed successfully");
};

export default command;
