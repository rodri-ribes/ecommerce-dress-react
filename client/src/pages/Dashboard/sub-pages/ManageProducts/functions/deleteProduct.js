export default async function deleteProduct(p, deleteFile, deleteProductMutation){
    try {
      for (const img of p.images) {
        await deleteFile("products", img?.name);
      }
    } catch (error) {
      console.log(error);
    }
    deleteProductMutation.mutate(p.idConfig);
  };