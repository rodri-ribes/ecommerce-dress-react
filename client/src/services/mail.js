import axios from "axios";

const { REACT_APP_API } = process.env;

const token = window.localStorage.getItem("user");

export async function addMail(data) {
  const resp = await axios.post(`${REACT_APP_API}/mail/add`, data);

  return resp.data;
}

export async function getMail() {
  const resp = await axios.get(`${REACT_APP_API}/mail/get`, {
    headers: {
      "x-access-token": token,
    },
  });
  return resp.data;
}

export async function deleteMail(data) {
  const resp = await axios.delete(`${REACT_APP_API}/mail/delete/${data.id}`, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}
