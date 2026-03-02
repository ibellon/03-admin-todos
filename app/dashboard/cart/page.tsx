import { Product } from "@/app/products/data/products";
import { cookies } from "next/headers"
import { string, number } from 'yup';
import { products } from '../../products/data/products';
import { ItemCart } from "@/app/shopping-cart";
import { WidgetItem } from "@/app/components";

export const metadata = {
  title: "Carrito de Compras",
  description: "Director de PATATAS RISI"
}

interface ProductInCart {
    product: Product
    quantity: number
}

const getProductsInCart = (cart:{[id:string]:number}) => {
    const productsInCart:ProductInCart[] = [];
    for(const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if(product) {
            productsInCart.push({product: product, quantity: cart[id]})
        }
    }
    return productsInCart;
}

export default async function CartPage() {

    const cookiesStore = await cookies();
    const cart = JSON.parse(cookiesStore.get("cart")?.value ?? '{}') as {[id:string]:number}
    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce(
        (previous, current) => (current.product.price * current.quantity) + previous, 0);

    return (
        <div>
            <h1 className="text-5xl">Productos en el Carrito</h1>
            <hr className="mb-2"></hr>

            <div className="flex flex-col sm:flex-row gap-2 w-full">

                <div className="flex flex-col gap-2 w-full sm:8/12">
                    {
                        productsInCart.map(({product, quantity}) => {
                            return <ItemCart key={product.id} product={product} quantity={quantity}></ItemCart>
                        })
                    }
                </div>

                <div className="flex flex-col sm:w-4/12">
                    <WidgetItem title="Total a pagar:">
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">{ (totalToPay * 1.20).toFixed(2) }</h3>
                        </div>
                        <span className="font-bold text-center text-gray-500">Impuestos 20%: { (totalToPay * 0.20).toFixed(2) }</span>     
                    </WidgetItem>
                </div>

            </div>
        </div>
    )
}

