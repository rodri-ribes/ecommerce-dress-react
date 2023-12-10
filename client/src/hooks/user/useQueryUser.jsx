import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUser } from "../../services/user";

export default function useQueryUser() {
  const [shouldLoadUser, setShouldLoadUser] = useState(false);


  const token = window.localStorage.getItem("user");

  const { isLoading, isError, data } = useQuery(["user"], getUser, {
    refetchOnWindowFocus: false,
    enabled: shouldLoadUser,
  });

  const reloadUser = () => {
    if(token && !data) setShouldLoadUser(true)
  };
  
  return {
    isLoading,
    isError,
    user: data,
    reloadUser,
  };
}
