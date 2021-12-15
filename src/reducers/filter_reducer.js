import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    if (action.payload.length < 1) {
      return { ...state, loading: true, error: false };
    }
    if (!action.payload) {
      return { ...state, loading: false, error: true };
    }
    return { ...state, all_products: action.payload, loading: false };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, basicView: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, basicView: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
