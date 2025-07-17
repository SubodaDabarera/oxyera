import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import React from "react";

interface createProps {
  patientId: number;
  medicationId: number;
  startDate: string;
  duration: number;
}

export default function useAssignments() {
  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/assignments`);
      if (response.data.statusCode === 200) {
        return response.data.data;
      }
    } catch (error) {
      return;
    }
  };

  const createNewAssignment = async ({
    patientId,
    medicationId,
    startDate,
    duration,
  }: createProps) => {
    if (!patientId || !medicationId || !startDate || !duration) return;
    await axios.post(`${API_BASE_URL}/assignments`, {
      patientId,
      medicationId,
      startDate,
      duration,
    });
  };
  return { fetchAssignments, createNewAssignment };
}
