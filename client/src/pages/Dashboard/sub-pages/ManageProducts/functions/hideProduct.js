
export default async function hideProduct(p, updateProductMutation) {
    updateProductMutation.mutate({ idConfig: p.idConfig, show: !p.show });
  };
