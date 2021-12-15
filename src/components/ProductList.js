import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filtered_products, basicView } = useFilterContext();

  return (
    <>
      {basicView ? (
        <GridView all_products={filtered_products} />
      ) : (
        <ListView all_products={filtered_products} />
      )}
    </>
  );
};

export default ProductList;
