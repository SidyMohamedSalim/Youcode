import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link
        href={"admin/courses"}
        className={clsx(buttonVariants({ variant: "ghost" }))}
      >
        See the course
      </Link>
    </div>
  );
};

export default page;
