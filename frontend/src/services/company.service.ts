import { AxiosError } from "axios";
import axiosInstance from "../lib/api/axiosConfig";
import type { Company } from "../types/credit.types";

const getCompany = async (id: number): Promise<Company> => {
  try {
    const response = await axiosInstance.get(`/company/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      `[getCompany] Error fetching company ${id}:`,
      axiosError.message
    );
    throw error;
  }
};

export const companyService = {
  getCompany,
};
