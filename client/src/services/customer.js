import axios from "axios";

const { REACT_APP_API } = process.env;

const token = window.localStorage.getItem("user");

export async function addCustomer(data) {
  const resp = await axios.post(`${REACT_APP_API}/customer/add`, data, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}

export async function updateCustomer(data) {
  const resp = await axios.patch(`${REACT_APP_API}/customer/update`, data, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}

export async function getCustomers() {
  const resp = await axios.get(`${REACT_APP_API}/customer/get`, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data.customers;
}

export async function deleteCustomer(id) {
  const resp = await axios.delete(`${REACT_APP_API}/customer/delete/${id}`, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}
