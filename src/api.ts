export const baseURL = "https://dummyjson.com";
export const productURL = `${baseURL}/products`;
export const productDetailsURL = `${baseURL}/products`;
export const categoryListURL = `${baseURL}/products/category-list`;
export const getCartURL = (userId: number) => `${baseURL}/carts/user/${userId}`;
export const getCartDelURL = (cartId: number) => `${baseURL}/carts/${cartId}`;
export const allUserURL = `${baseURL}/users`;
export const userDelURL = `${baseURL}/users`;
export const allCartURL = `${baseURL}/carts`;