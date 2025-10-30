import { useQuery } from "@tanstack/react-query";
import { companyService } from "../services/company.service";

export const useCompany = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["company", id],
    queryFn: () => companyService.getCompany(id),
    enabled: !!id,
  });

  return {
    company: data,
    isLoading,
    error,
  };
};

export const useCompanyByUserId = (userId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companyByUserId", userId],
    queryFn: () => companyService.getCompanyByUserId(userId),
    enabled: !!userId,
  });

  return {
    company: data,
    isLoading,
    error,
  };
};
