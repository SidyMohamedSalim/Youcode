// app/Providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};
