import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useTasks() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: tasks = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  return [tasks, loading, refetch];
}
