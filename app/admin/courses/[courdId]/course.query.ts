import { prisma } from "@/db/prisma";

export const getCourse = async ({
  courseId,
  userId,
  CurrentPage,
}: {
  courseId: string;
  userId: string;
  CurrentPage: number;
}) =>
  await prisma.course.findUnique({
    where: { id: courseId, creatorId: userId },
    select: {
      name: true,
      users: {
        take: 0,
        skip: Math.max(0, CurrentPage * 5),
        select: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          users: true,
          lessons: true,
        },
      },
    },
  });
