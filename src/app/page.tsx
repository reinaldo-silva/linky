import { Logo } from "@/components/Logo";
import { ShortenUrlForm } from "@/components/shortenUrlForm";

export default function Home() {
  return (
    <div className="bg-zinc-50 h-svh flex flex-col items-center justify-center">
      <Logo />
      <p className="text-zinc-500 mt-2">Shorten and manage your URLs easily.</p>
      <ShortenUrlForm />
    </div>
  );
}
