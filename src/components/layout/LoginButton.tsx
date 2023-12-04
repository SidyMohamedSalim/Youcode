"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const AuthButton = () => {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        signIn();
      }}
    >
      Login
    </Button>
  );
};

export default AuthButton;
