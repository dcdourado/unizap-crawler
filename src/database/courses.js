import Services from "../services/index.js";
import Client from "./client.js";

const { Logger } = Services;

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
          institute: c.institute,
          city: c.city,
          type: c.type,
        },

        update: {
          code: c.code,
          name: c.name,
          institute: c.institute,
          city: c.city,
          type: c.type,
        },
      })
    )
  );
  Logger.info("Courses persisted successfully");

  return true;
};

const findOldest = async () => {
  Logger.info("Finding oldest course...");

  return Client.course.findFirst({
    orderBy: [
      {
        updatedAt: "asc",
      },
    ],
  });
};

const Courses = {
  persist,
  findOldest,
}

export default Courses;
