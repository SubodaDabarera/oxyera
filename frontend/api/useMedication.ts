import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import React from "react";

interface CreateProps {
  name: string;
  dosage: string;
  frequency: string;
}

export default function useMedication() {
  const fetchMedications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medications`);
      if (response.data.statusCode === 200) {
        return response.data.data;
      }
    } catch (error) {
      return;
    }
  };

  const createNewMedication = async ({
    name,
    dosage,
    frequency,
  }: CreateProps) => {
    if (!name.trim() || !dosage.trim() || !frequency.trim()) return;
    await axios.post(`${API_BASE_URL}/medications`, {
      name,
      dosage,
      frequency,
    });
  };

  return { fetchMedications, createNewMedication };
}
