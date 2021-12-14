import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  return (
    <main>
      <PageHero actualPage={'checkout'} />
      <Wrapper className="page section section-center">
        <article>
          <div className="title">
            <h2>There is no checkout for this cloned project</h2>

            <Link to="/" className="btn">
              Back Home
            </Link>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
