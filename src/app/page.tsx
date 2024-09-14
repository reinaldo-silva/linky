import { ClientOnly } from "@/components/ClientOnly";
import { Logo } from "@/components/Logo";
import { ShortenUrlForm } from "@/components/ShortenUrlForm";

export default function Home() {
  return (
    <div className="bg-zinc-50 h-svh flex flex-col items-center justify-center">
      <ClientOnly
        fallback={
          <div className="animate-pulse bg-zinc-300 rounded-xl w-[138px] h-[42px]" />
        }
      >
        <Logo whitAnimation />
      </ClientOnly>
      <p className="text-zinc-500 mt-2">Shorten and manage your URLs easily.</p>
      <ShortenUrlForm />
    </div>
  );
}
