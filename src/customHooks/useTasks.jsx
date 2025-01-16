import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

export default function useTasks() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: tasks = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/tasks/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  return [tasks, loading, refetch];
}
