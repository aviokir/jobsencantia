import { supabase } from "../../lib/supabase";
import Link from "next/link";
import { useState } from "react";

export default function JobDetail({ job, error }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    reason: "",
    discord: "",
    preferredName: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  if (!job) {
    return (
      <main className="bg-slate-950 text-white min-h-screen px-6 pt-32 pb-16">
        <p className="text-center mt-20 text-xl">Trabajo no encontrado</p>
        <div className="text-center mt-6">
          <Link href="/" className="text-indigo-400 hover:underline">
            ← Volver a la lista
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Enviando...");

    console.log("Job en submit:", job);

    const { data, error } = await supabase.from("applications").insert([
      {
        job_id: job.id, // UUID
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dob,
        phone: formData.phone,
        reason_for_work: formData.reason,
        discord_username: formData.discord,
        preferred_name: formData.preferredName,
      },
    ]);

    console.log("Data devuelta:", data);
    console.log("Error devuelto:", error);

    if (error) {
      setSubmitStatus("Error al enviar la aplicación");
    } else {
      setSubmitStatus("¡Aplicación enviada con éxito!");
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        reason: "",
        discord: "",
        preferredName: "",
      });
    }
  };

  return (
    <main className="bg-slate-950 text-white min-h-screen px-6 pt-32 pb-16">
      <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-lg space-y-6">
        <Link href="/" className="text-indigo-400 mb-6 inline-block hover:underline">
          ← Volver
        </Link>

        <h1 className="text-4xl font-bold">{job.title}</h1>
        {job.team && <p className="text-slate-400">Equipo: {job.team}</p>}
        {job.location && <p className="text-slate-400">Ubicación: {job.location}</p>}
        {job.salary && <p className="text-indigo-400 font-semibold">Salario: {job.salary}</p>}
        {job.description && <p className="mt-4">{job.description}</p>}
        {job.requirements && job.requirements.length > 0 && (
          <>
            <h3 className="font-semibold mt-4">Requisitos:</h3>
            <ul className="list-disc ml-6">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </>
        )}

        {/* Formulario de aplicación */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Aplica a este trabajo</h2>

          {/* Aviso de privacidad */}
          <div className="mb-4 p-4 rounded-lg bg-yellow-300 text-yellow-900 border-l-4 border-yellow-600">
            <p>
              Tus datos personales serán tratados de forma segura y confidencial. 
              No serán compartidos con terceros y solo se usarán para el proceso de selección de Encantia y Fetu Studios. 
              Por favor asegúrate de que la información ingresada sea correcta antes de enviar tu aplicación. 
              Al enviar este formulario, aceptas que tus datos se almacenen temporalmente en nuestra base de datos para fines de selección.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Número de teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <input
              type="text"
              name="discord"
              placeholder="Usuario de Discord"
              value={formData.discord}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              name="preferredName"
              placeholder="Preferred First Name"
              value={formData.preferredName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              name="reason"
              placeholder={`Motivo por el que quieres trabajar en ${job.title}`}
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500"
              rows={4}
            ></textarea>

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl font-semibold"
            >
              Enviar aplicación
            </button>
          </form>
          {submitStatus && <p className="mt-2">{submitStatus}</p>}
        </div>
      </div>
    </main>
  );
}

// Traer datos del trabajo según el slug
export async function getServerSideProps({ params }) {
  const { slug } = params;

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .ilike("slug", slug)
    .single();

  return {
    props: { job: job || null, error: error ? JSON.stringify(error) : null },
  };
}
