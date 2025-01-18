import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: loginUser = null,
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/email/${user.email}`);
      return data;
    },
  });

  const role = loginUser?.role;

  return [role, loading];
}
