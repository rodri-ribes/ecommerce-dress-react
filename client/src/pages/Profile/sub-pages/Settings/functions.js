export const loadImage = (e, setOptions, handleOnCompress) => {
  setOptions((prev) => ({ ...prev, showEditImage: true }));

  handleOnCompress(e);
};

export const uploadImage = async (
  setOptions,
  user,
  deleteFile,
  uploadFile,
  mutate,
  handleNotification,
  images
) => {
  setOptions((prev) => ({ ...prev, showEditImage: false }));

  if (user?.image?.name?.length > 0) {
    try {
      await deleteFile("profile-images", user.image.name);
    } catch (error) {
      console.log(error);
    }
  }

  let image = await uploadFile(
    images,
    "profile-images",
    user?.email?.split("@")[0]
  );

  mutate(
    { image: image },
    {
      onSuccess: (resp) => {
        handleNotification({
          status: true,
          title: resp.data.message,
          text: "",
        });
      },
      onError: () => {
        handleNotification({
          status: false,
          title: "Error",
          text: "Vuelve a intentarlo mas tarde.",
        });
      },
    }
  );
};
