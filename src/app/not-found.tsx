import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-svh justify-center items-center">
      <Logo />

      <h2 className="text-4xl mt-8 font-bold">Not Found - 404</h2>
      <p className="text-zinc-500">Could not find requested resource</p>
      <Link href="/" className="min-w-[300px]">
        <Button className="mt-4" type="button">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
