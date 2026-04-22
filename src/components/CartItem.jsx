import React from "react";
import styled from "styled-components";

const CartItem = ({ item, onCheck, onIncrease, onDecrease }) => {
  return (
    <CartItemSec>
      <CartInfo>
        <div className="top-wrap">
          <div className="right-wrap">
            <CustomCheckbox>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={onCheck}
              />
              <span className="checkbox-icon"></span>{" "}
            </CustomCheckbox>
            <h3>{item.brand}</h3>
          </div>
        </div>
        <div className="info-content">
          <img src={item.image}></img>
          <div className="sub-info-wrap">
            <p className="name">{item.name}</p>
            <p className="delivery">{item.deliveryInfo}</p>
            <CountBox>
              <button onClick={() => onDecrease(item.id)}>-</button>
              <span>{item.count}</span>
              <button onClick={() => onIncrease(item.id)}>+</button>
            </CountBox>
            <div className="price-wrap">
              <span>{item.discountRate}%</span>
              <p className="price">
                {(item.price * item.count).toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </CartInfo>
      <CartInfo></CartInfo>
    </CartItemSec>
  );
};

const CartItemSec = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  background-color: #fff;
`;

const CustomCheckbox = styled.label`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkbox-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 1px solid #d0d0d0;
    transition: all 0.2s;
    border-radius: 2px;
  }

  input:checked + .checkbox-icon {
    background-color: #000;
    border-color: #000;
  }

  .checkbox-icon:after {
    content: "";
    position: absolute;
    display: none;

    left: 5px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    border-radius: 1px;
  }

  input:checked + .checkbox-icon:after {
    display: block;
  }
`;

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #000;
  gap: 10px;
  background-color: #fff;

  .top-wrap {
    display: flex;
    justify-content: space-between;

    .right-wrap {
      display: flex;
      gap: 8px;
      align-items: center;

      h3 {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .info-content {
    display: flex;
    gap: 10px;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      flex-shrink: 0;
      min-width: 80px;
    }

    .sub-info-wrap {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 10px;
      width: 100%;

      .delivery {
        font-size: 12px;
        font-weight: 500;
      }

      .name {
        font-weight: 500;
        font-size: 14px;
      }

      .price-wrap {
        display: flex;
        gap: 4px;
        justify-content: end;
        span {
          font-weight: 700;
          font-size: 18px;
          color: #ff4800;
        }
        .price {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  width: fit-content;
  border-radius: 4px;

  button {
    width: 28px;
    height: 28px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;

    &:active {
      background-color: #f4f4f4;
    }
  }

  span {
    width: 30px;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    line-height: 28px;
  }
`;

export default CartItem;
