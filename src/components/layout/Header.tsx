import Link from "next/link";
import { Typography } from "../ui/Typography";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SiteConfig } from "@/lib/SiteConfig";
import { getAuthSession } from "@/lib/auth";
import AuthButton from "./AuthButton";

export async function Header() {
  const session = await getAuthSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {session?.user.id ? <p>{session.user.name}</p> : <AuthButton />}
          </nav>
        </div>
      </div>
    </header>
  );
}
