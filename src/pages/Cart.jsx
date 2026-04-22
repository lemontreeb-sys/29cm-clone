import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { PiCaretLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const isAllCheck =
    cartItems.length > 0 && cartItems.every((item) => item.checked);

  const handleAllCheck = () => {
    const newCart = cartItems.map((item) => ({
      ...item,
      checked: !isAllCheck,
    }));
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleItemCheck = (id) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCount = (id, type) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const newCount = type === "plus" ? item.count + 1 : item.count - 1;
        return { ...item, count: newCount > 0 ? newCount : 1 };
      }
      return item;
    });
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleDeleteSelected = () => {
    const checkedItems = cartItems.filter((item) => item.checked);
    if (checkedItems.length === 0) {
      alert("삭제할 상품을 선택해주세요.");
      return;
    }

    if (window.confirm("선택한 상품을 장바구니에서 삭제할까요?")) {
      const newCart = cartItems.filter((item) => !item.checked);

      setCartItems(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const checkedItems = cartItems.filter((item) => item.checked);
  const totalCount = checkedItems.reduce((acc, cur) => acc + cur.count, 0);
  const totalAmount = checkedItems.reduce(
    (acc, cur) => acc + cur.price * cur.count,
    0,
  );

  const totalDiscount = checkedItems.reduce((acc, cur) => {
    const originalPrice = cur.price / (1 - cur.discountRate / 100);
    return acc + (originalPrice - cur.price) * cur.count;
  }, 0);

  const handlePayment = () => {
    if (checkedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }

    if (window.confirm(`${totalAmount.toLocaleString()}원을 결제할까요?`)) {
      const remainingItems = cartItems.filter((item) => !item.checked);
      setCartItems(remainingItems);
      localStorage.setItem("cart", JSON.stringify(remainingItems));
      alert("결제가 완료되었습니다.");
    }
  };

  return (
    <CartSec>
      <TopBar>
        <button className="back" onClick={() => navigate(-1)}>
          <PiCaretLeft size={20} color="#000" />
        </button>
        <h2>장바구니</h2>
      </TopBar>
      <ControlBar>
        <label onClick={handleAllCheck}>
          <CustomCheckbox>
            <input type="checkbox" checked={isAllCheck} readOnly />
            <span className="checkbox-icon"></span>
          </CustomCheckbox>
          <span>전체선택</span>
        </label>
        <button className="delete-selected" onClick={handleDeleteSelected}>
          선택삭제
        </button>
      </ControlBar>
      <CartList>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onCheck={() => handleItemCheck(item.id)}
              onIncrease={() => handleCount(item.id, "plus")}
              onDecrease={() => handleCount(item.id, "minus")}
            ></CartItem>
          ))
        ) : (
          <Empty>장바구니 비어있음</Empty>
        )}
      </CartList>
      <PaymentBar>
        <div className="price-info">
          <p>
            총 할인금액 <span className="chip">최대 할인 적용</span>
          </p>

          <span className="amount">
            -{Math.floor(totalDiscount).toLocaleString()}원
          </span>
        </div>
        <button className="payBtn" onClick={handlePayment}>
          <span className="price">{totalAmount.toLocaleString()}원</span>
          <span className="text">결제하기</span>
          <span className="count">({totalCount}개)</span>
        </button>
      </PaymentBar>
    </CartSec>
  );
};

const PaymentBar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 28px 20px 40px;
  border-top: 1px solid #f4f4f4;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border-radius: 20px 20px 0 0;
  gap: 24px;

  .price-info {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    font-size: 16px;
    font-weight: 600;
    .chip {
      font-size: 12px;
      background-color: #ddd;
      padding: 2px 6px;
      color: #ff4800;
      border-radius: 2px;
      font-weight: 600;
      margin-left: 4px;
      background-color: #fff0eb;
    }

    .amount {
      color: #ff4800;
      font-weight: 700;
    }
  }

  .payBtn {
    background-color: #000;
    color: #fff;
    font-size: 16px;
    padding: 16px 20px;
    border-radius: 4px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    gap: 4px;
    align-items: center;
  }
`;

const CartSec = styled.section`
  padding: 0px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TopBar = styled.header`
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 430px;
  margin: 0 auto;
  z-index: 1010;
  padding: 20px 20px;
  background-color: #fff;

  .back {
    position: absolute;
    left: 20px;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #000;
  }
`;

const ControlBar = styled.div`
  position: fixed;
  max-width: 430px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f4;
  z-index: 1010;
  width: 100%;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #000;

    user-select: none;

    span {
      font-size: 14px;
    }
  }

  .delete-selected {
    background: none;
    border: none;
    font-size: 13px;
    color: #5d5d5d;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;
const CustomCheckbox = styled.div`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }

  .checkbox-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 1px solid #d0d0d0;
    z-index: 1;
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
const CartList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #f3f3f3;
  margin-top: 105px;
  margin-bottom: 170px;
`;

const Empty = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Cart;
