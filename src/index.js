import Logger from "./logger.js";

import COMMANDS from "./commands.js";

const args = process.argv;

// Clearing not usefull args
args.shift();
args.shift();

Logger.log(args);
args.forEach((arg) => {
  switch (arg) {
    case COMMANDS.CURSOS:
      Logger.info("SUCCESS!")
      break;
    default:
      Logger.warn(`Unknown argument: ${arg}`);
  }
});
