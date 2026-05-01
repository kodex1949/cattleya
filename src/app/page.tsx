export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <h1 className="text-2xl font-semibold">Cattleya</h1>
      <div className="mt-6 flex flex-col gap-3">
        <a
          href="/mobile"
          className="inline-flex w-fit rounded-full border border-black px-5 py-3 text-sm"
        >
          Version mobile
        </a>

        <a
          href="/pc"
          className="inline-flex w-fit rounded-full border border-black px-5 py-3 text-sm"
        >
          Version pc
        </a>
      </div>
    </main>
  );
}