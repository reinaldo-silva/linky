import { initDB } from "@/lib/redis";
import { ensureHttp } from "@/utils/ensureHttp";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const { getUrlById } = initDB();
  const entry = await getUrlById(id);

  if (entry) {
    const url = ensureHttp(entry);

    return redirect(url);
  } else {
    return redirect("/url-not-found");
  }
}

export default function RedirectPage() {
  return <p>Redirecionando...</p>;
}
