import dotenv from "dotenv";

dotenv.config();

import Logger from "./logger.js";
import Commands from "./commands/index.js";

const args = process.argv;

// Clearing not usefull args
args.shift();
args.shift();

(async () => {
  switch (args[0]) {
    case "cursos":
      await Commands.subjects(args[1]);
      break;
    default:
      Logger.warn(`Unknown argument: ${arg}`);
  }

  Logger.info("Job executed with success.")
})();
