import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "./Typography";

export default function LoginButton() {
  return (
    <Button
      asChild
      variant="default"
      className="bg-secondary rounded-full px-6 text-primary no-underline hover:bg-secondary/90 duration-300 transition-opacity ease-in-out"
      type="button"
    >
      <Link href="/login">
        <Typography variant="default" className="text-primary">
          Login / Register
        </Typography>
      </Link>
    </Button>
  );
}
