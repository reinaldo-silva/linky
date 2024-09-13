import { ShortenUrlForm } from "@/components/shortenUrlForm";
import { Link2 } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-zinc-50 h-svh flex flex-col items-center justify-center">
      <Logo />
      <ShortenUrlForm />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-end mx-auto select-none">
      <div className="border-[3px] border-zinc-800 rounded-xl p-1">
        <Link2 size={28} color="black" className="-rotate-45" strokeWidth={3} />
      </div>
      <h1 className="font-sans text-3xl font-semibold ml-2">Linky!</h1>
    </div>
  );
}
