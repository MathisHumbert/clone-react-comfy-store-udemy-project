import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { all_products, basicView } = useFilterContext();

  return (
    <>
      {basicView ? (
        <GridView all_products={all_products} />
      ) : (
        <ListView all_products={all_products} />
      )}
    </>
  );
};

export default ProductList;
