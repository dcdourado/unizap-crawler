import Logger from "../logger.js";
import Client from "./client.js";

const persist = async (courses) => {
  Logger.info("Persisting courses...");

  if (courses.length === 0) {
    Logger.warn("Could not persist courses since it is an empty array");

    return false;
  }

  await Promise.all(
    courses.map((c) =>
      Client.course.upsert({
        where: {
          code: c.code,
        },

        create: {
          code: c.code,
          name: c.name,
          group: c.group,
          city: c.city,
          type: c.type,
        },

        update: {
          code: c.code,
          name: c.name,
          group: c.group,
          city: c.city,
          type: c.type,
        },
      })
    )
  );
  Logger.info("Courses persisted successfully");

  return true;
};

export default persist;
