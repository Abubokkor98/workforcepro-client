import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/roles/${user.email}`);
      return data;
    },
  });

  return [role, loading];
}
