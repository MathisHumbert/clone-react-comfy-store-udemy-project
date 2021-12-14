import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) return { ...state, isSidebarOpen: true };
  if (action.type === SIDEBAR_CLOSE) return { ...state, isSidebarOpen: false };
  if (action.type === GET_PRODUCTS_BEGIN)
    return { ...state, loading: true, error: false };
  if (action.type === GET_PRODUCTS_ERROR)
    return { ...state, loading: false, error: true };
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const all_products = action.payload;
    const featured_products = all_products.filter(
      (item) => item.featured === true
    );
    return { ...state, featured_products, all_products, loading: false };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN)
    return { ...state, loading: true, error: false };
  if (action.type === GET_SINGLE_PRODUCT_ERROR)
    return { ...state, loading: false, error: true };
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS)
    return { ...state, single_product: action.payload, loading: false };

  if (action) throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
