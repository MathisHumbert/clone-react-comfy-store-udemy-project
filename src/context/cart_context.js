import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

const localProducts = JSON.parse(localStorage.getItem('products')) || [];
console.log(localProducts);

const initialState = {
  products: localProducts,
  amount: 0,
  price: 0,
  shipping_fee: 5.49,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const countCartTotals = () => {
    dispatch({ type: COUNT_CART_TOTALS });
  };

  useEffect(() => {
    countCartTotals();
    localStorage.setItem('products', JSON.stringify(state.products));
  }, [state.products]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeCartItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
