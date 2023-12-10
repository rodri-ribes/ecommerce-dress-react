export default function verifyPurchases(purchases, setModal) {
    let filtered = purchases?.find(p => {
        return (p.status.text === "Verificando comprobante...")
    })

    if(filtered){
        setModal({
            view: true,
            text: `El pago de la compra efectuada el ${filtered?.date?.split(" - ")[1]} no se ha verificado. Por favor, aguarde la aprobación de esta transacción para poder realizar nuevas compras.`
        })
        return true
    }else{
        return false
    }
}