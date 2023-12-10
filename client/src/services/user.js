import axios from "axios";

const { REACT_APP_API } = process.env;

const token = window.localStorage.getItem("user");

export async function getUser() {
  try {
    const resp = await axios.get(`${REACT_APP_API}/user/get`, {
      headers: {
        "x-access-token": token,
      },
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signinUser(data) {
  return await axios.post(`${REACT_APP_API}/user/signin`, data);
}

export async function signupUser(data) {
  return await axios.post(`${REACT_APP_API}/user/signup`, data);
}

export async function updateUser(data) {
  return await axios.patch(`${REACT_APP_API}/user/update`, data, {
    headers: {
      "x-access-token": token,
    },
  });
}


export async function getPurchases(id) {
  try {
    let resp = await axios.get(`${REACT_APP_API}/customer/getuser/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return resp.data
  } catch (error) {
      console.log(error)
  }
}
