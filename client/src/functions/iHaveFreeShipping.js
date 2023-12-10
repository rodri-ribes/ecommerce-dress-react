import totalCart from "./totalCart";

export default function iHavefreeShipping(user, product, setting) {
    const subtotal = totalCart(user);
    let text = "";

    if(subtotal >= setting.free_min_amount){
        text = `Ya cuentas con Envío Gratis por los productos cargado en tu carrito, suma a tu carrito ${product.title} para ahorrar en envío.`
    }else{
        let total = subtotal + (product.offer > 0 ? product.discount : product?.price);
        text = total >= setting.free_min_amount ?  "Suma este producto para obtener Envío Gratis." : "Añade este producto y algunos más para obtener Envío Gratis."
    }

    return text
}