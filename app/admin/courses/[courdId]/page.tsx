import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/db/prisma";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { getCourse } from "./course.query";
import { getRequiredAuthSession } from "@/lib/auth";
import ButtonPagination from "@/features/ButtonPagination";
import { cn } from "@/lib/utils";

const page = async ({
  params,
  searchParams,
}: {
  params: { courdId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getRequiredAuthSession();

  const page = Number(searchParams.page ?? 0);

  const course = await getCourse({
    courseId: params.courdId,
    userId: session.user.id,
    CurrentPage: page,
  });

  if (!course) {
    return notFound();
  }

  return (
    <Layout>
      <LayoutHeader className="text-lg font-bold">Courses</LayoutHeader>

      <LayoutContent>
        <div className="grid grid-cols-6 gap-2">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {course.users?.map((user) => (
                    <TableRow>
                      <TableCell>
                        <Avatar className="rounded">
                          <AvatarFallback>
                            {user?.email
                              ?.split("")
                              .slice(0, 1)
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                          <AvatarImage
                            src={user.image ?? ""}
                            alt={user.name ?? ""}
                          ></AvatarImage>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography variant="small">
                          {user.name ?? user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"secondary"}>
                          {user.canceled ? "Mute" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"secondary"}>
                          <Menu className="text-gray-500"></Menu>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <ButtonPagination
                totalPages={course._count?.lessons ?? 0 / 5}
                currentPage={page}
                baseUrl={`/admin/courses/${course.id}`}
              />
            </CardFooter>
          </Card>
          <Card className="col-span-2">
            <CardHeader className="text-center">
              <CardTitle>🧨 {course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant={"destructive"} size={"sm"}>
                DRAFT
              </Button>
              <div className="my-4 font-light">
                <Typography variant={"small"}>
                  {course._count?.users ?? 0} users
                </Typography>
                <Typography variant={"small"}>
                  {course._count?.lessons ?? 0} Lessons
                </Typography>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col  gap-2">
              <Link
                href={"/"}
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                Edit
              </Link>
              <Link
                href={"/"}
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                Edit Lessons
              </Link>
            </CardFooter>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
};

export default page;
