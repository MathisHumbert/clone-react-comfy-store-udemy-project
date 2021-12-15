import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product }) => {
  const { colors, stock, id, name, price, images } = product;
  const image = images[0].url;

  const { addToCart } = useCartContext();

  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const toggleAmount = (type) => {
    if (type === 'inc') {
      setAmount((oldAmount) => {
        let newAmount = oldAmount + 1;
        if (newAmount > stock) newAmount = stock;
        return newAmount;
      });
    } else {
      setAmount((oldAmount) => {
        let newAmount = oldAmount - 1;
        if (newAmount < 0) newAmount = 1;
        return newAmount;
      });
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color, colorIndex) => {
            return (
              <button
                className={`${
                  color === mainColor ? 'color-btn active' : 'color-btn'
                }  `}
                style={{ background: color }}
                onClick={() => setMainColor(colors[colorIndex])}
                key={colorIndex}
              >
                {color === mainColor ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons amount={amount} toggleAmount={toggleAmount} />
        <Link
          to="/cart"
          className="btn"
          onClick={() =>
            addToCart({
              id: id + mainColor,
              color: mainColor,
              image,
              name,
              price,
              stock,
              amount,
            })
          }
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
