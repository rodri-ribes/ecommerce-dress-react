import { storage } from "../services/firebase/config";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

export default function useFileUploader() {
  const uploadFile = async (file, folder, title) => {
    let name = `${title} ${v4().split("-").pop()}`;

    const storageRef = ref(storage, `${folder}/` + name);

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    return { link: url, name: name };
  };

  const deleteFile = async (folder, name) => {
    const storageRef = ref(storage, `${folder}/` + name);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    uploadFile,
    deleteFile,
  };
}
