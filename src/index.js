import dotenv from "dotenv";

dotenv.config();

import Logger from "./logger.js";
import Commands from "./commands/index.js";
import Client from "./persist/client.js";

const args = process.argv;

// Clearing not usefull args
args.shift();
args.shift();

(async () => {
  switch (args[0]) {
    case "courses":
      await Commands.courses();
      break;
    default:
      Logger.warn(`Unknown argument: ${arg}`);
  }

  Client.$disconnect();
})();
