"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/api";
import { calculateRemainingDays } from "@/lib/utils";

interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
}

interface Medication {
  id: number;
  name: string;
}

interface Assignment {
  id: number;
  startDate: string;
  duration: number;
  patient: Patient;
  medication: Medication;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const fetchPatients = async () => {
    const res = await fetch(`${API_BASE_URL}/patients`);
    const data = await res.json();
    setPatients(data.data);
  };

  const fetchAssignments = async () => {
    const res = await fetch(`${API_BASE_URL}/assignments`);
    const data = await res.json();
    setAssignments(data.data);
  };

  const createPatient = async () => {
    if (!name.trim() || !dateOfBirth) return;
    await fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dateOfBirth }),
    });
    setName("");
    setDateOfBirth("");
    fetchPatients();
  };

  useEffect(() => {
    fetchPatients();
    fetchAssignments();
  }, []);

  return (
    <div className="p-8 font-sans space-y-6">
      <h1 className="text-2xl font-bold">Patients</h1>

      <div className="flex gap-2">
        <input
          className="border px-2 py-1 rounded w-48"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <button
          onClick={createPatient}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {patients.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            <div className="font-semibold mb-1">
              #{p.id} - {p.name}
            </div>
            <ul className="ml-4 list-disc">
              {assignments
                .filter((a) => a.patient.id === p.id)
                .map((a) => (
                  <li key={a.id} className="text-sm">
                    {a.medication.name} -{" "}
                    {calculateRemainingDays(a.startDate, a.duration)} days
                    remaining
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
