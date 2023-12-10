import Compressor from "compressorjs";
import { useState } from "react";

export default function useCompress() {
  const [images, setImages] = useState(false);

  const handleOnCompress = (e) => {
    let list = Object.values(e.target.files);
    if (list.length > 1) {
      for (const img of list) {
        new Compressor(img, {
          quality: 0.6,
          async success(result) {
            setImages((prev) => [...prev, result]);
          },
          error(err) {
            console.log(err.message);
          },
        });
      }
    } else {
      new Compressor(e.target.files[0], {
        quality: 0.6,
        async success(result) {
          setImages(result);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  return {
    images,
    setImages,
    handleOnCompress,
  };
}
