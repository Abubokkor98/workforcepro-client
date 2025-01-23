import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useTasks() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: tasksData = [],
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

  // sorting tasks by date
  const tasks = tasksData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return [tasks, loading, refetch];
}
