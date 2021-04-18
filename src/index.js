import Logger from "./logger.js";

import Commands from "./commands/index.js";

const args = process.argv;

// Clearing not usefull args
args.shift();
args.shift();

Logger.log(args);
args.forEach((arg) => {
  switch (arg) {
    case "cursos":
      Logger.info("Cursos command called");
      Commands.cursos();
      break;
    default:
      Logger.warn(`Unknown argument: ${arg}`);
  }
});
