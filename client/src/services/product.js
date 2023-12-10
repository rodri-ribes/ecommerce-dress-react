import axios from "axios";

const { REACT_APP_API } = process.env;

const token = window.localStorage.getItem("user");

export async function getProducts() {
  try {
    let resp = await axios.get(`${REACT_APP_API}/product/getall`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(id) {
  let resp = await axios.get(`${REACT_APP_API}/product/getone/${id}`);
  return resp.data;
}

export async function addProduct(data) {
  let resp = await axios.post(`${REACT_APP_API}/product/add`, data, {
    headers: {
      "x-access-token": token,
    },
  });
  return resp.data;
}

export async function deleteProduct(data) {
  let resp = await axios.delete(`${REACT_APP_API}/product/delete/${data}`, {
    headers: {
      "x-access-token": token,
    },
  });
  return resp.data;
}

export async function updateProduct(data) {
  let resp = await axios.patch(`${REACT_APP_API}/product/update`, data, {
    headers: {
      "x-access-token": token,
    },
  });
  return resp.data;
}
