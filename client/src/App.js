import { useEffect } from "react";
import "./App.scss";

//------ Imports
import { useLocation } from "react-router-dom";
import useNotification from "./hooks/useNotification";

//------ components

import NavBar from "./components/NavBar/NavBar";
import Notification from "./components/Notification/Notification";
import Footer from "./components/Footer/Footer";
import RouteConnections from "./Routes/RouteConnections";

//------ hooks
import useQueryProducts from "./hooks/product/useQueryProducts";
import useQueryUser from "./hooks/user/useQueryUser";
import useSetting from "./hooks/useSetting";

function App() {
  let location = useLocation();
  let { notification } = useNotification();

  const { reloadProducts } = useQueryProducts();
  const { reloadUser } = useQueryUser();
  const { reloadSetting } = useSetting();

  useEffect(() => {
    reloadProducts();
    reloadUser();
    reloadSetting()
  }, []);

  return (
    <>
      {!location.pathname.includes("/dashboard") && <NavBar />}
      <div className="App">
        <RouteConnections />
      </div>
      {notification && (
        <Notification
          status={notification?.status}
          title={notification?.title}
          text={notification?.text}
        />
      )}
      {!location.pathname.includes("/dashboard") && <Footer />}
    </>
  );
}

export default App;
