"use client";

import { API_BASE_URL } from "@/lib/api";
import { useEffect, useState } from "react";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");

  const fetchMedications = async () => {
    const res = await fetch(`${API_BASE_URL}/medications`);
    const data = await res.json();
    setMedications(data.data);
  };

  const createMedication = async () => {
    if (!name.trim() || !dosage.trim() || !frequency.trim()) return;
    await fetch(`${API_BASE_URL}/medications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dosage, frequency }),
    });
    setName("");
    setDosage("");
    setFrequency("");
    fetchMedications();
  };

  useEffect(() => {
    fetchMedications();
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
