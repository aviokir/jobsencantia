import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function CareersHome({ jobs }) {
  console.log("Jobs recibidos en componente:", jobs);

  return (
    <main className="bg-slate-950 text-white min-h-screen px-6 pt-32 pb-16">
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold">
          Trabaja en <span className="text-indigo-400">Encantia y Fetu Studios</span>
        </h1>
      </section>

      <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              className="block bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500 cursor-pointer text-center"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
            </Link>
          ))
        ) : (
          <p className="text-center text-slate-400 col-span-full">
            No hay trabajos disponibles
          </p>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("id, title, slug")
    .order("created_at", { ascending: false });

  console.log("Jobs desde Supabase (servidor):", jobs, "Error:", error);

  return {
    props: {
      jobs: jobs || [],
    },
  };
}

