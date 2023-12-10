import axios from "axios";

const { REACT_APP_API } = process.env;

const token = window.localStorage.getItem("user");

export async function addSetting(data) {
  const resp = await axios.post(`${REACT_APP_API}/setting/add`, data, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}

export async function getSetting() {
  try {
    const resp = await axios.get(`${REACT_APP_API}/setting/get`, {
      headers: {
        "x-access-token": token,
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateSetting(data) {
  const resp = await axios.patch(`${REACT_APP_API}/setting/update`, data, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}
