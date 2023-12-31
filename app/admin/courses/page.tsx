import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/db/prisma";
import Image from "next/image";
import React from "react";

const page = async () => {
  const courses = await prisma.course.findMany();
  return (
    <div>
      <Card className="mx-auto mt-4 max-w-xl space-y-0">
        <CardHeader className="space-y-0">
          <div className="flex items-center justify-between">
            <CardTitle>
              <h3 className="text-xl">Courses</h3>
            </CardTitle>
            <Button variant={"outline"}>New Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div className="avatar">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-neutral-200 dark:bg-neutral-800">
                        {course.image ? (
                          <Image
                            width={40}
                            height={40}
                            alt={course.name}
                            src={course.image}
                          />
                        ) : (
                          <p>
                            {course.name
                              .split("")
                              .slice(0, 2)
                              .join("")
                              .toLocaleUpperCase()
                              .toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{course.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
