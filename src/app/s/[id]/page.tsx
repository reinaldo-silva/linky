import { initDB } from "@/db/db";
import { ensureHttp } from "@/utils/ensureHttp";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const db = await initDB();
  const entry = db.data.urls.find((urlEntry) => urlEntry.id === id);

  if (entry) {
    const url = ensureHttp(entry.url);

    return redirect(url);
  } else {
    return notFound();
  }
}

export default function RedirectPage() {
  return <p>Redirecionando...</p>;
}
