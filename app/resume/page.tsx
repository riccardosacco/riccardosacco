import Resume from "@/app/ui/resume";

export default async function ResumePage({
  searchParams: { id = "b2631e83-ed56-4865-83e9-8af75bcd0e46" },
}: {
  searchParams: { id?: string };
}) {
  return (
    <main className="min-h-screen md:py-6">
      <Resume id={id} />
    </main>
  );
}
