import { useContext } from "react";
import NotiContext from "../context/NotificationContext";

export default function useNotification() {
  const { notification, setNotification } = useContext(NotiContext);

  /**
   * espera un objeto con {status: true / false, title: "", text: ""}
   * @param {object} message
   */
  const handleNotification = (message) => {
    setNotification({
      status: message.status,
      title: message.title,
      text: message.text,
    });
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  const deleteNotification = () => {
    setNotification(false);
  };

  return {
    notification,
    handleNotification,
    deleteNotification,
  };
}
