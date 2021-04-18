import Logger from "./logger";

import COMMANDS from "./commands";

const args = process.argv;

// Clearing not usefull args
args.shift();
args.shift();

console.log(args);
args.forEach((arg) => {
  switch (arg) {
    case COMMANDS.CURSOS:
      break;
    default:
      Logger.warn(`Unknown argument: ${arg}`);
  }
});
