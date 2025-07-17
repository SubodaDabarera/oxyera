"use client";

import { useEffect, useState } from "react";
import { calculateRemainingDays } from "@/lib/utils";
import usePatient from "@/api/usePatient";
import useAssignments from "@/api/useAssignment";
import Patient from "@/lib/types/patient";
import Assignment from "@/lib/types/assignment";

export default function PatientsPage() {
  const { fetchPatients, createNewPatient } = usePatient();
  const { fetchAssignments } = useAssignments();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const getPatients = async () => {
    setPatients(await fetchPatients());
  };

  const getAssignments = async () => {
    setAssignments(await fetchAssignments());
  };

  const createPatient = async () => {
    await createNewPatient({ name, dateOfBirth });
    setName("");
    setDateOfBirth("");
    getPatients();
  };

  useEffect(() => {
    getPatients();
    getAssignments();
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
