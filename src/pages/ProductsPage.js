import React from 'react';
import styled from 'styled-components';
import {
  Filters,
  ProductList,
  Sort,
  PageHero,
  Loading,
  Error,
} from '../components';
import { useFilterContext } from '../context/filter_context';

const ProductsPage = () => {
  const { loading, error } = useFilterContext();

  if (loading) {
    return (
      <>
        <PageHero />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Error />
      </>
    );
  }

  return (
    <main>
      <PageHero actualPage={'Products'} />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
