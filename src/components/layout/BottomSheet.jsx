import React from "react";
import styled from "styled-components";

const BottomSheet = ({ product, onClose }) => {
  const [count, setCount] = React.useState(1);

  const discountPrice = product.price * (product.discountRate / 100);
  const discount = discountPrice * count;
  const finalPrice = (product.price - discountPrice) * count;

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const handleBuyClike = () => {
    alert(`구매가 완료되었습니다!`);
    onClose();
  };

  return (
    <>
      <Overlay onClick={onClose}>
        <SheetWrapp onClick={(e) => e.stopPropagation()}>
          <InfoSec>
            <QuantitiySec>
              <button onClick={handleDecrease} className="dec-btn">
                -
              </button>
              <input type="number" value={count}></input>
              <button onClick={handleIncrease} className="inc-btn">
                +
              </button>
            </QuantitiySec>
            <PriceSec>
              <div>
                상품가격 <span>{product.price.toLocaleString()}원</span>
              </div>
              <div>
                할인 가격 <span>-{discount.toLocaleString()}원</span>
              </div>
              <span className="bar"></span>
              <div className="total">
                총 결제금액 <span>{finalPrice.toLocaleString()}원</span>
              </div>
            </PriceSec>
          </InfoSec>

          <BuyButton onClick={handleBuyClike}>구매하기</BuyButton>
        </SheetWrapp>
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 9998;
`;

const SheetWrapp = styled.section`
  display: flex;
  border-radius: 28px 28px 0px 0px;
  height: auto;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 430px;
  z-index: 9999;
  background: #fff;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding: 32px 20px 20px;
`;

const CloseButton = styled.button`
  display: flex;
`;

const InfoSec = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const QuantitiySec = styled.div`
  display: flex;
  width: 100%;
  button {
    padding: 6px 10px;
    color: #000;
    border: 1px solid #b7b7b7;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .inc-btn {
    border-radius: 0px 4px 4px 0px;
  }

  .dec-btn {
    border-radius: 4px 0px 0px 4px;
    font-size: 20px;
  }

  input {
    background-color: #fff;
    border: 1px solid #b7b7b7;
    border-left: none;
    border-right: none;
    color: #000;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    width: 80%;
    outline: none;
    cursor: default;
    caret-color: transparent;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const PriceSec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;

  .bar {
    width: 100%;
    height: 2px;
    background-color: #000;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  div > span {
    font-weight: 700;
  }
  .total {
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .total > span {
    color: #ff3636;
    font-size: 20px;
    font-weight: 700;
  }
`;

const BuyButton = styled.button`
  display: flex;
  background-color: #000;
  color: #fff;
  height: 48px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  border-radius: 4px;
  margin-top: 28px;
`;

export default BottomSheet;
