import axios from "axios";
import Compressor from "compressorjs";
import { deleteFile, uploadFile } from "../../../firebase/config";

export default async function loadImages(
  images,
  folderName,
  title,
  setUploadImages
) {
  // let imageLinks = [];
  // let imageNames = [];

  if (Array.isArray(images)) {
    for (const img of images) {
      new Compressor(img, {
        quality: 0.6,

        async success(result) {
          let resp = await uploadFile(result, folderName, title);

          // imageLinks.push(resp[1]);

          // imageNames.push(resp[0]);

          await setUploadImages((prev) => ({
            ...prev,
            links: [...prev.links, resp[1]],
            names: [...prev.names, resp[0]],
          }));
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  } else {
    new Compressor(images, {
      quality: 0.6,

      async success(result) {
        let resp = await uploadFile(result, folderName, title);

        // imageLinks.push(resp[1]);

        // imageNames.push(resp[0]);
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  // console.log("antes de retornar", imageLinks, imageNames);
  // return [imageLinks, imageNames];
}
