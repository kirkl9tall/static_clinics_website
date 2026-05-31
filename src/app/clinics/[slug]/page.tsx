import { redirect } from "next/navigation";

export default async function ClinicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/de/clinics/${slug}`);
}
