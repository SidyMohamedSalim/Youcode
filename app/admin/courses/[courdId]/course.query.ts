import { prisma } from "@/db/prisma";

export const getCourse = async ({
  courseId,
  userId,
  CurrentPage,
}: {
  courseId: string;
  userId: string;
  CurrentPage: number;
}) => {
  const courses = await prisma.course.findUnique({
    where: {
      creatorId: userId,
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        take: 5,
        skip: Math.max(0, CurrentPage * 5),
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              email: true,
              name: true,
              id: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const users = courses?.users.map((user) => {
    return {
      canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...courses,
    users,
  };
};
