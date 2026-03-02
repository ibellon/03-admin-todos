import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { number } from "yup";
import { ItemCart } from '../components/ItemCart';

export const getCookieCart = ():{ [id:string]:number } => {

    if(hasCookie("cart")) {
        const cookieCart = JSON.parse(getCookie("cart") as string ?? '{}')
        return cookieCart;
    }

    return {};
}

export const addProductToCart = (id:string) => {
    var cookieCart = getCookieCart();
    
    if(cookieCart) {
        if(cookieCart[id]) {
            cookieCart[id] += 1
        }
        else {
            cookieCart[id] = 1
        }
    }
    else {
        const cookieCart = {};
    }    
    setCookie("cart", JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id:string) => {
    var cookieCart = getCookieCart();
    cookieCart[id] = 0;
    setCookie("cart", JSON.stringify(cookieCart))
}

export const removeSingleItemFromCart = (id:string) => {
    var cookieCart = getCookieCart();
    if(!cookieCart[id]) return;

    const itemsInCart = cookieCart[id] - 1;

    if(itemsInCart <= 0) {
        delete cookieCart[id];
    }
    else {
        cookieCart[id] = itemsInCart;
    }

    setCookie("cart", JSON.stringify(cookieCart))    
}