import Services from "../services/index.js";
import Client from "./client.js";

const { Logger } = Services;

const upsert = async (subjects) => {
  Logger.info("Upserting subjects...");

  if (subjects.length === 0) {
    Logger.warn("Could not upsert subjects since it is an empty array");

    return false;
  }

  await Promise.all(
    subjects.map((s) =>
      Client.subject.upsert({
        where: {
          acronym: s.acronym,
        },

        create: {
          acronym: s.acronym,
          name: s.name,
          workload: s.workload,
        },

        update: {
          acronym: s.acronym,
          name: s.name,
          workload: s.workload,
        },
      })
    )
  );
  Logger.info("Subjects upserted successfully");

  return true;
};

const Subjects = {
  upsert,
};

export default Subjects;
