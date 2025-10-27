import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { creditApplicationService } from "../services/creditApplication.service";
import type { CreditRequest } from "../types/credit.types";

export const useCreditApplications = () => {
  const {
    data: applications,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["creditApplications"],
    queryFn: creditApplicationService.getCreditApplications,
    staleTime: 5 * 60 * 1000,
  });

  return {
    applications,
    isLoading,
    error,
    refetch,
  };
};

export const useCreditApplication = (id: number | undefined) => {
  const {
    data: application,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["creditApplication", id],
    queryFn: () => creditApplicationService.getCreditApplicationById(id!),
    enabled: !!id,
  });

  return {
    application,
    isLoading,
    error,
  };
};

export const useCreateCreditApplication = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreditRequest) =>
      creditApplicationService.createCreditApplication(data),
    onSuccess: () => {
      // Invalida la lista para que se recargue
      queryClient.invalidateQueries({ queryKey: ["creditApplications"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Error creating credit application:", error.message);
      } else {
        console.error("Error creating credit application:", error);
      }
    },
  });

  return {
    createApplication: mutation.mutate,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
