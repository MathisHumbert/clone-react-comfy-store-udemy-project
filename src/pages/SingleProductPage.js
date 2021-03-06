import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { fetchSingleProduct, single_product, loading, error } =
    useProductsContext();
  const { id } = useParams('id');

  useEffect(() => {
    if (!id) return;
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  if (loading || !single_product.id) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const {
    colors,
    company,
    descrtiption,
    id: productId,
    images,
    name,
    price,
    reviews,
    stars,
    stock,
  } = single_product;

  return (
    <Wrapper>
      <PageHero link={true} actualPage={name} />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5>{formatPrice(price)}</h5>
            <p className="desc">{descrtiption}</p>
            <p className="info">
              <span>Available: </span>
              {stock > 0 ? 'in stock' : 'out of stock'}
            </p>
            <p className="info">
              <span>SKU: </span>
              {productId}
            </p>
            <p className="info">
              <span>Brand: </span>
              {company}
            </p>
            <hr />
            <AddToCart product={single_product} />
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
