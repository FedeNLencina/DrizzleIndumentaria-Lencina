import { createContext, useState } from "react";


export const CartContext = createContext();

export function CartProvider({ children }) {
  const [productCartList, setProductCartList] = useState([]);
 
  const isInCart = (id) => {
   const elementExists = productCartList.some((elemento) => elemento.id === id);
   return elementExists;
 };
  // const addProduct = (product) => {
  //   const newList = [...productCartList, product];
  //   setProductCartList(newList);
  // };

  const addProduct = (product, qty) => {
    const newList = [...productCartList];
    //verifico si el producto existe en el arreglo
    // si existe, actualice la propiedad quantity de ese producto
    if (isInCart(product.id)) {
      const productIndex = productCartList.findIndex(
        (element) => element.id === product.id
      );
      newList[productIndex].quantity = newList[productIndex].quantity + qty;
      newList[productIndex].totalPrice =
        newList[productIndex].quantity * newList[productIndex].price;
      setProductCartList(newList);
    } else {
      //si no existe, agregue el producto al listado
      const newProduct = {
        ...product,
        quantity: qty,
        totalPrice: qty * product.price,
      };
      // {id:1,title:"camisa", quantity:3}
      const newList = [...productCartList];
      newList.push(newProduct);
      setProductCartList(newList);
    }
  };

  const removeProduct = (idProduct) => {
    const copyArray = [...productCartList];
    const newArray = copyArray.filter((elm) => elm.id !== idProduct);
    setProductCartList(newArray);
    };
    
    const clearProductList= () => {
        setProductCartList([]);
    }

  
    const getTotalProducts = () => {
      const totalProducts = productCartList.reduce(
        (accumulador, item) => accumulador + item.quantity,
        0
      );
      return totalProducts;
    };

    const getTotalPrice = () => {
      const totalPriceProducts = productCartList.reduce(
        (accumulador, item) => accumulador + item.totalPrice,
        0
      );
      return totalPriceProducts;
    };
    

  return (
    <CartContext.Provider
      value={{
        productCartList,
        addProduct,
        removeProduct,
        clearProductList,
        isInCart,
        getTotalProducts,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
