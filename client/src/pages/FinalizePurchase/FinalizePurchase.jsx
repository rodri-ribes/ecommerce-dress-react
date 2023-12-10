import React, { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//------ Imports
import { useQueryClient } from "@tanstack/react-query";
import style from "./FinalizePurchase.module.scss";
//------ Functions
import validate from "./functions/validate";

//------ Hooks
import useMutationCustomer from "../../hooks/customer/useMutationCustomer";

//------ Components

const AfterPaying = lazy(() => import("./components/AfterPaying"));
const BeforePaying = lazy(() => import("./components/BeforePaying"));

export default function FinalizePurchase() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user"]);
  const buynow = queryClient.getQueryData(["buynow"]);

  const { customer, addCustomerMutation } = useMutationCustomer();

  const [success, setSuccess] = useState({
    purchase: false,
    customer: false,
    pdfUploaded: false,
  });

  const [data] = useState(JSON.parse(window.localStorage.getItem("purchase")));

  useEffect(() => {
    if (customer && !data) {
      navigate("/");
    }
  }, []);

  return (
    <div className={style.container}>
      {success.purchase ? (
        <AfterPaying
          style={style}
          success={success}
          setSuccess={setSuccess}
          user={user}
          navigate={navigate}
        />
      ) : (
        <BeforePaying
          style={style}
          data={data}
          success={success}
          buynow={buynow}
          user={user}
          setSuccess={setSuccess}
          addCustomerMutation={addCustomerMutation}
        />
      )}
    </div>
  );
}
