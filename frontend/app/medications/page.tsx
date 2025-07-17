"use client";

import useMedication from "@/api/useMedication";
import { API_BASE_URL } from "@/lib/api";
import Medication from "@/lib/types/medication";
import { useEffect, useState } from "react";

export default function MedicationsPage() {
  const { fetchMedications, createNewMedication } = useMedication();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");

  const getMedications = async () => {
    setMedications(await fetchMedications());
  };

  const createMedication = async () => {
    await createNewMedication({ name, dosage, frequency });
    setName("");
    setDosage("");
    setFrequency("");
    getMedications();
  };

  useEffect(() => {
    getMedications();
  }, []);

  return (
    <div className="p-8 font-sans space-y-6">
      <h1 className="text-2xl font-bold">Medications</h1>

      <div className="flex gap-2 flex-wrap">
        <input
          className="border px-2 py-1 rounded w-40"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded w-32"
          placeholder="Dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
        <input
          className="border px-2 py-1 rounded w-32"
          placeholder="Frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <button
          onClick={createMedication}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {medications.map((m) => (
          <li key={m.id} className="border p-2 rounded text-sm">
            #{m.id} - {m.name} ({m.dosage}, {m.frequency})
          </li>
        ))}
      </ul>
    </div>
  );
}
