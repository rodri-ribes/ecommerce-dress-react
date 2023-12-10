import axios from "axios";

const { REACT_APP_API } = process.env;

const token = window.localStorage.getItem("user");

export async function addComment(data) {
  const resp = await axios.post(`${REACT_APP_API}/comment/add`, data, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}

export async function updateComment(data) {
  const resp = await axios.patch(`${REACT_APP_API}/comment/update`, data, {
    headers: {
      "x-access-token": token,
    },
  });

  return resp.data;
}

export async function deleteComment(data) {
  await axios.delete(
    `${REACT_APP_API}/comment/delete/${data.id}/${data.id_product}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
}
