import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { number } from "yup";

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
    const cookieCart = getCookieCart();
    cookieCart[id] = 0;
    //deleteCookie(cookieCart[id] as any)
    setCookie("cart", JSON.stringify(cookieCart))
}