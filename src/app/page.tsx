import { ClientOnly } from "@/components/ClientOnly";
import { Logo } from "@/components/Logo";
import { ShortenUrlForm } from "@/components/ShortenUrlForm";

export default function Home() {
  return (
    <div className="bg-zinc-50 h-svh flex flex-col items-center justify-center">
      <ClientOnly
        fallback={
          <div className="animate-pulse bg-zinc-200 rounded-xl w-full max-w-3xl h-[42px]" />
        }
      >
        <Logo whitAnimation />
      </ClientOnly>
      <p className="text-zinc-500 mt-2">Shorten and manage your URLs easily.</p>
      <ClientOnly
        fallback={
          <div className="flex flex-col w-full items-end sm:max-w-[460px] gap-4 mt-8">
            <div className="animate-pulse bg-zinc-200 rounded-xl w-full h-[58px]" />
            <div className="animate-pulse bg-zinc-200 rounded-xl w-[105px] h-[28px]" />
            <div className="animate-pulse bg-zinc-200 rounded-xl w-full h-[56px]" />
          </div>
        }
      >
        <ShortenUrlForm />
      </ClientOnly>
    </div>
  );
}
