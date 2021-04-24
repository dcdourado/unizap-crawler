// import puppeteer from "puppeteer";

import Services from "../services/index.js";
import Database from "../database/index.js";
// import Helpers from "./helpers/index.js";

const { Logger } = Services;

const command = async () => {
  const course = await Database.Courses.findOldest();

  Logger.log(course);
};

export default command;
