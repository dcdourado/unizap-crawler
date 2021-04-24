import Services from "../services/index.js";
import Client from "./client.js";

const { Logger } = Services;

const upsert = async (courses) => {
  Logger.info("Upserting courses...");

  if (courses.length === 0) {
    Logger.warn("Could not upsert courses since it is an empty array");

    return [];
  }

  const result = await Promise.all(
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

  return result;
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

const syncSubjects = async (course, subjects) => {
  Logger.info(`Synching ${course.name} subjects...`);

  const connectedSubjects = subjects.map((s) => ({
    where: { courseId_subjectId: { courseId: course.id, subjectId: s.id } },
    create: {
      period: s.period,
      subject: {
        connect: {
          id: s.id,
        },
      },
    },
  }));

  return Client.course.update({
    where: {
      id: course.id,
    },

    data: {
      updatedAt: new Date(),
      subjects: {
        connectOrCreate: connectedSubjects,
      },
    },
  });
};

const Courses = {
  upsert,
  findOldest,
  syncSubjects,
};

export default Courses;
