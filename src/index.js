import dotenv from "dotenv";

dotenv.config();

import Logger from "./logger.js";
import Commands from "./commands/index.js";

const args = process.argv;

// Clearing not usefull args
args.shift();
args.shift();

(async () => {
  Logger.log(args);
  switch (args[0]) {
    case "cursos":
      Logger.info("Cursos command called");
      await Commands.cursos();
      break;
    default:
      Logger.warn(`Unknown argument: ${arg}`);
  }

  Logger.info("Job executed with success.")
})();
