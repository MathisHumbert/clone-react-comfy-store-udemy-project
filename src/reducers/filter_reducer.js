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
    const max = Math.max(...action.payload.map((item) => item.price));
    const min = Math.min(...action.payload.map((item) => item.price));

    return {
      ...state,
      all_products: action.payload,
      filtered_products: action.payload,
      loading: false,
      filters: { ...state.filters, price: max, max, min },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, basicView: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, basicView: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filters.max,
        shipping: false,
      },
    };
  }
  if (action.type === SORT_PRODUCTS) {
    let filtered_products = state.all_products;
    const { sort } = state;
    if (sort === 'price-lowest') {
      filtered_products = filtered_products.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      filtered_products = filtered_products.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      filtered_products = filtered_products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === 'name-z') {
      filtered_products = filtered_products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return { ...state, filtered_products };
  }
  if (action.type === FILTER_PRODUCTS) {
    let filtered_products = state.all_products;
    const { filters } = state;
    const { text, category, company, color, price, shipping } = filters;

    if (text) {
      filtered_products = filtered_products.filter(
        (item) => item.name.includes(text) === true
      );
    }

    if (category !== 'all') {
      filtered_products = filtered_products.filter(
        (item) => item.category === category
      );
    }

    if (company !== 'all') {
      filtered_products = filtered_products.filter(
        (item) => item.company === company
      );
    }

    if (color !== 'all') {
      filtered_products = filtered_products.filter(
        (item) => item.colors.includes(color) === true
      );
    }

    filtered_products = filtered_products.filter((item) => item.price <= price);

    if (shipping) {
      filtered_products = filtered_products.filter(
        (item) => item.shipping === true
      );
    }

    return { ...state, filtered_products };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
