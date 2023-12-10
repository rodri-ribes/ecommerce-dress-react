import React, { useEffect, useState } from "react";
import style from "./ContentDetail.module.scss";

//------ Imports
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

//------ Components
import Spinner from "../../components/Spinner/Spinner";
import CommentBox from "../../components/CommentBox/CommentBox";
import CarouselProducts from "../../components/CarouselProducts/CarouselProducts";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import ProductPanel from "./components/ProductPanel/ProductPanel";
import ListImages from "./components/ListImages/ListImages";

//------ Functions
import { thereIsStock } from "./functions/thereIsStock";
import { productInTheCart } from "./functions/productIntheCart";
import getProduct from "./functions/getProduct";

//------ hooks
import useQueryProducts from "../../hooks/product/useQueryProducts";
import useMutationUser from "../../hooks/user/useMutationUser";
import useSetting from "../../hooks/useSetting";
import MobileContentDetail from "./components/MobileContentDetail/MobileContentDetail";

export default function ContentDetail() {
  let { id } = useParams();

  const queryClient = useQueryClient();
  const { user, updateUserMutation } = useMutationUser();
  const {setting} = useSetting();

  //query products/product
  const { reloadProduct } = useQueryProducts();

  const products = queryClient.getQueryData(["products"]);
  const product = queryClient.getQueryData(["product"]);

  const [showImage, setShowImage] = useState(
    product ? product?.images[0]?.link : ""
  );

  const [options, setOptions] = useState({
    showDescription: false, //para ver la descripcion
    loadedProduct: false, //si ya esta cargado en el carrito
    thereIsStock: false, //si es true no hay stock
  });

  const [productFeatures, setProductFeatures] = useState({
    waist: "",
    color: "",
    amount: 1,
  });

  const [modal, setModal] = useState({
    view: false,
    text: "",
  });

  useEffect(() => {
    //reseteamos los states al cambiar de producto
    setProductFeatures({ waist: "", color: "", amount: 1 });
    setOptions((prev) => ({ ...prev, thereIsStock: false }));

    getProduct(products, product, id, setShowImage, reloadProduct, queryClient);

    if (product && user) {
      //para saber si el user ya lo tiene cargado en el carrito
      productInTheCart(setOptions, user, product);

      //para saber si hay stock en el producto
      thereIsStock(product, setOptions);
    }
  }, [products, id, product, user]);

  return (
    <div className={style.container}>
      {product ? (
        <>
          <MobileContentDetail 
             showImage={showImage}
             setShowImage={setShowImage}
             product={product}
             setOptions={setOptions}
             options={options}
             productFeatures={productFeatures}
             setProductFeatures={setProductFeatures}
             queryClient={queryClient}
             setModal={setModal}
             user={user}
             setting={setting}
             updateUserMutation={updateUserMutation}
          />
          <div className={style.container__content}>
            <ListImages
              showImage={showImage}
              product={product}
              setShowImage={setShowImage}
            />
            <ProductPanel
              product={product}
              setOptions={setOptions}
              options={options}
              productFeatures={productFeatures}
              setProductFeatures={setProductFeatures}
              queryClient={queryClient}
              setModal={setModal}
              user={user}
              updateUserMutation={updateUserMutation}
              setting={setting}
            />
          </div>
          {modal.view && <ModalAlert modal={modal} setModal={setModal} />}
        </>
      ) : (
        <Spinner />
      )}
      {products?.length > 0 && (
        <div className={style.container__products}>
          <CarouselProducts products={products} perView={"4"} />
        </div>
      )}

      {product && user && (
        <div className={style.container__boxComments}>
          <CommentBox product={product} />
        </div>
      )}
    </div>
  );
}
