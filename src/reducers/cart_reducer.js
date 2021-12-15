import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const product = action.payload;

    const sameProduct = state.products.find((item) => item.id === product.id);

    if (!sameProduct) {
      return { ...state, products: [...state.products, product] };
    }

    sameProduct.amount += product.amount;
    return { ...state };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const products = state.products.filter(
      (item) => item.id !== action.payloas
    );
    return { ...state, products };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, type } = action.payload;

    const products = state.products.map((item) => {
      if (item.id === id) {
        if (type === 'inc') {
          let amount = item.amount + 1;
          if (amount > item.stock) amount = item.stock;
          return { ...item, amount };
        } else {
          let amount = item.amount - 1;
          if (amount < 0) amount = 1;
          return { ...item, amount };
        }
      }
      return item;
    });
  }

  if (action.type === CLEAR_CART) {
    return { ...state, products: [] };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { amount, price } = state.products.reduce(
      (acc, curr) => {
        return acc;
      },
      { amount: 0, price: 0 }
    );
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
