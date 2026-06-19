import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <div className="bg-sky-50 min-h-screen">
      <div className="max-w-3xl mx-auto flex items-center justify-center flex-col p-3 gap-3">
        <Navbar />

        <section className="bg-white rounded-md p-3 flex flex-col sm:flex-row gap-3 w-full"></section>
      </div>
    </div>
  );
}
