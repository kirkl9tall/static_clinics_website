import { redirect } from "next/navigation";

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/de/team/${slug}`);
}
