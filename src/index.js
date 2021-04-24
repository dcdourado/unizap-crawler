import dotenv from "dotenv";

dotenv.config();

import Services from "./services/index.js";
import Commands from "./commands/index.js";
import Client from "./persist/client.js";

const { Logger } = Services;

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
