import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="">
      <Button><LoginLink>Sign in</LoginLink></Button>
      <Button><LogoutLink>Sign up</LogoutLink></Button>
    </div>
  );
}
