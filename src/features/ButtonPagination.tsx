"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type ButtonPaginationsProps = {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
};

const ButtonPagination = ({
  totalPages,
  currentPage,
  baseUrl,
}: ButtonPaginationsProps) => {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        size={"sm"}
        disabled={currentPage === 0}
        onClick={(e) => {
          e.preventDefault();

          const searchParams = new URLSearchParams({
            page: String(currentPage - 1),
          });
          const url = `${baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Previous
      </Button>
      <Button
        variant={"outline"}
        size={"sm"}
        disabled={currentPage === totalPages}
        onClick={(e) => {
          e.preventDefault();

          const searchParams = new URLSearchParams({
            page: String(currentPage + 1),
          });
          const url = `${baseUrl}?${searchParams.toString()}`;
          router.push(url);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default ButtonPagination;
