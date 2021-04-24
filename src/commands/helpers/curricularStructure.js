import Services from "../../services/index.js";

const { Logger } = Services;

const command = async (page, course) => {
  Logger.info("Accessing courses section...");

  await page.hover("table[summary='main menu'] > tbody > tr > td");
  await page.hover("table[summary='sub menu'] > tbody > tr:last-child");

  const [coursesTr] = await page.$x(
    "//td[contains(text(), 'Consultar Estrutura Curricular')]"
  );
  await coursesTr.click();

  await page.waitForNavigation({ waitUntil: "load" });
  Logger.info("Courses section accessed successfully");

  if (course === undefined) {
    return;
  }
  Logger.info(`Selecting ${course.name}...`)

  await page.click("[name='busca:checkCurso']");

  await page.$eval(
    "[name='busca:curso']",
    (el, c) => (el.value = c.code),
    course
  );

  Logger.info("Searching for curricular structures...")
  page.click("[value='Buscar']");
  await page.waitForNavigation({ waitUntil: "load" });

  Logger.info("Selecting the latest one...")
  page.click("#resultado\\:relatorio");
  await page.waitForNavigation({ waitUntil: "load" });
};

export default command;
