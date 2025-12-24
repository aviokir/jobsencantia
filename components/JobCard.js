import Link from "next/link";

export default function JobCard({ job }) {
  if (!job) return null;

  return (
    <Link href={`/${job.slug}`}>
      <a className="block bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500 transition cursor-pointer shadow-lg">
        <h2 className="text-xl font-semibold">{job.title || "Título no disponible"}</h2>
        {job.team && <p className="text-slate-400 mt-1">{job.team}</p>}
        {job.location && <p className="text-slate-400">{job.location}</p>}
        {job.salary && <p className="text-indigo-400 mt-2 font-semibold">{job.salary}</p>}
      </a>
    </Link>
  );
}
