import { getAuthSession } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";

export type AuthButtonProps = {};

export const AuthButton = async (props: AuthButtonProps) => {
  const session = await getAuthSession();

  const user = session?.user;

  return !user ? <LoginButton /> : <LogoutButton user={user} />;
};
