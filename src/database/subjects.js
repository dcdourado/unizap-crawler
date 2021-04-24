import Services from "../services/index.js";
import Client from "./client.js";

const { Logger } = Services;

const upsert = async (subjects) => {
  Logger.info("Upserting subjects...");

  if (subjects.length === 0) {
    Logger.warn("Could not upsert subjects since it is an empty array");

    return false;
  }
};

const Subjects = {
  upsert,
};

export default Subjects;
