import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addSetting, getSetting, updateSetting } from "../services/setting";
import useNotification from "./useNotification";

import { setting } from "../constants/const";

export default function useSetting() {

  const queryClient = useQueryClient();
  
  const [shouldLoad, setShouldLoad] = useState(false);

  const { handleNotification } = useNotification();


  const addSettingMutation = useMutation(addSetting, {
    onSuccess: (resp) => {
      queryClient.setQueryData(["setting"], resp.setting);
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const updateSettingMutation = useMutation(updateSetting, {
    onSuccess: (resp) => {
      queryClient.setQueryData(["setting"], resp.setting);
    },
    onError: (error) => {
      handleNotification({
        status: false,
        title: "Error",
        text: error.response.data,
      });
    },
  });

  const {data} = useQuery(["setting"], getSetting, {
    refetchOnWindowFocus: false,
    enabled: shouldLoad,
    refetchInterval: false,
  })

  const reloadSetting = () => {
    if (!data) setShouldLoad(true);
  };

  return {
    addSettingMutation,
    updateSettingMutation,
    reloadSetting,
    setting: queryClient.getQueryData(["setting"])
      ? queryClient.getQueryData(["setting"])
      : setting,
  };
}
