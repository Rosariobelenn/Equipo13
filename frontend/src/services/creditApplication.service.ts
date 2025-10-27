import { AxiosError } from "axios";
import axiosInstance from "../lib/api/axiosConfig";
import type { CreditApplication, CreditRequest } from "../types/credit.types";

const getCreditApplications = async (): Promise<CreditApplication[]> => {
  try {
    const response = await axiosInstance.get(
      "/credit-applications?page=1&limit=10"
    );

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[getCreditApplications] Error fetching credit applications:",
      axiosError.message
    );
    throw error;
  }
};

const getCreditApplicationById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/credit-applications/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[getCreditApplicationById] Error fetching application ${id}:`,
      axiosError.message
    );
    throw error;
  }
};

const createCreditApplication = async (data: CreditRequest) => {
  try {
    const response = await axiosInstance.post("/credit-applications", data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[createCreditApplication] Error creating application:",
      axiosError.message
    );
    throw error;
  }
};

export const creditApplicationService = {
  getCreditApplications,
  getCreditApplicationById,
  createCreditApplication,
};
