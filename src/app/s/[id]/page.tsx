import { getUrl } from "@/lib/useCases";
import { ensureHttp } from "@/utils/ensureHttp";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const entry = await getUrl.handle(id);

  if (entry) {
    const url = ensureHttp(entry.url);

    return redirect(url);
  } else {
    return redirect("/url-not-found");
  }
}

export default function RedirectPage() {
  return <p>Redirecionando...</p>;
}
