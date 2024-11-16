import { useQuery } from "@tanstack/react-query";

export const useTestQuery = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>
) => {
  const {
    data,
    status: queryStatus,
    error,
    refetch: queryRefetch,
  } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  const refetch = async () => {
    await queryRefetch();
  };

  return {
    data,
    status: queryStatus,
    error,
    refetch,
  };
};
