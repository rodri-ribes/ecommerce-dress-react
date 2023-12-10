import React, { useState } from "react";

const NotiContext = React.createContext({});

export default NotiContext;

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState(false);

  return (
    <NotiContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotiContext.Provider>
  );
}
