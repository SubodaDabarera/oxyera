"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/api";
import { calculateRemainingDays } from "@/lib/utils";
import Assignment from "@/lib/types/assignment";
import Medication from "@/lib/types/medication";
import Patient from "@/lib/types/patient";
import useAssignments from "@/api/useAssignment";
import usePatient from "@/api/usePatient";
import useMedication from "@/api/useMedication";

export default function AssignmentsPage() {
  const { fetchAssignments, createNewAssignment } = useAssignments();
  const { fetchPatients } = usePatient();
  const { fetchMedications } = useMedication();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [patientId, setPatientId] = useState("");
  const [medicationId, setMedicationId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const getAssignments = async () => {
    setAssignments(await fetchAssignments());
  };

  const getPatients = async () => {
    setPatients(await fetchPatients());
  };

  const getMedications = async () => {
    setMedications(await fetchMedications());
  };

  const createAssignment = async () => {
    await createNewAssignment({
      patientId: Number(patientId),
      medicationId: Number(medicationId),
      startDate,
      duration: Number(duration),
    });
    setPatientId("");
    setMedicationId("");
    setStartDate("");
    setDuration("");
    getAssignments();
  };

  useEffect(() => {
    getAssignments();
    getPatients();
    getMedications();
  }, []);

  return (
    <div className="p-8 font-sans space-y-6">
      <h1 className="text-2xl font-bold">Assignments</h1>

      <div className="flex gap-2 flex-wrap items-end">
        <select
          className="border px-2 py-1 rounded"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          <option value="">Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={medicationId}
          onChange={(e) => setMedicationId(e.target.value)}
        >
          <option value="">Medication</option>
          {medications.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="number"
          min="1"
          className="border px-2 py-1 rounded w-24"
          placeholder="Days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button
          onClick={createAssignment}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {assignments.map((a) => (
          <li key={a.id} className="border p-2 rounded text-sm">
            {a.patient.name} - {a.medication.name} (
            {calculateRemainingDays(a.startDate, a.duration)} days remaining)
          </li>
        ))}
      </ul>
    </div>
  );
}
