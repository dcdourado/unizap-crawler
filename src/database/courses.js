import Services from "../services/index.js";
import Client from "./client.js";

const { Logger } = Services;

const upsert = async (courses) => {
  Logger.info("Upserting courses...");

  if (courses.length === 0) {
    Logger.warn("Could not upsert courses since it is an empty array");

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
  Logger.info("Courses upserted successfully");

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
  upsert,
  findOldest,
};

export default Courses;
