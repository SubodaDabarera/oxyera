import React from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

interface createProps {
  name: string;
  dateOfBirth: string;
}

export default function usePatient() {
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients`);
      if (response.data.statusCode === 200) {
        return response.data.data;
      }
    } catch (error) {
      return;
    }
  };

  const createNewPatient = async ({ name, dateOfBirth }: createProps) => {
    if (!name.trim() || !dateOfBirth) return;
    await axios.post(`${API_BASE_URL}/patients`, { name, dateOfBirth });
  };

  return { fetchPatients, createNewPatient };
}
