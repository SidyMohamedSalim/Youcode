import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const page = async ({
  params,
  searchParams,
}: {
  params: { courdId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getRequiredAuthSession();

  const pageParams = searchParams.page;

  const page = Number(pageParams) ?? 0;

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
                  {course?.users.map((user) => (
                    <TableRow>
                      <TableCell>
                        <Avatar className="rounded">
                          <AvatarFallback>
                            {user?.user?.email
                              ?.split("")
                              .slice(0, 1)
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                          <AvatarImage
                            src={user.user.image ?? ""}
                            alt={user.user.name ?? ""}
                          ></AvatarImage>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography
                          as={Link}
                          variant="small"
                          href={`/admin/courses`}
                        >
                          {user.user.name ?? user.user.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Badge variant={"secondary"}>Active</Badge>
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
          </Card>
          <Card className="col-span-2">
            <CardHeader className="text-center">
              <CardTitle>🧨 Begin JavaScript</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant={"destructive"}>DRAFT</Button>
              <div className="my-4 font-light">
                <Typography variant={"small"}>
                  {course._count.users} users
                </Typography>
                <Typography variant={"small"}>
                  {course._count.lessons} Lessons
                </Typography>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col  gap-2">
              <Button className="w-full" variant={"outline"}>
                Edit
              </Button>
              <Button className="w-full" variant={"outline"}>
                Edit lessons
              </Button>
            </CardFooter>
          </Card>
        </div>
      </LayoutContent>
    </Layout>
  );
};

export default page;
