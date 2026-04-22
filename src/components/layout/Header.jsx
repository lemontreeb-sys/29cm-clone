import React from "react";
import styled from "styled-components";
import { Search, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartCount(parsedCart.length);
      } else {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdate", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdate", updateCartCount);
    };
  }, []);

  const hadleToCart = () => {
    navigate("/cart");
  };

  return (
    <HeaderContainer>
      <Logo as={Link} to="/">
        29CM
      </Logo>
      <IconWrap>
        <IconButton onClick={hadleToCart}>
          <CartIconWrap>
            <ShoppingBag size={24} strokeWidth={2}>
              {" "}
            </ShoppingBag>
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </CartIconWrap>
        </IconButton>
        <IconButton>
          <Search size={24} strokeWidth={2}></Search>
        </IconButton>
      </IconWrap>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  padding: 10px 20px;
  width: 100%;
  top: 0px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  max-width: 430px;
  background-color: #fff;
  box-sizing: border-box;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  margin: 0;
`;

const IconWrap = styled.div`
  display: flex;
  gap: 16px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  padding: 0;
  background: none;
  border: none;
`;

const CartIconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -6px;
  background-color: #ff4057; /* 29CM의 포인트 컬러 혹은 검정색(#000) */
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2px;
  box-sizing: border-box;
  border: 1.5px solid #fff; /* 아이콘과 겹칠 때 경계선이 생겨 더 깔끔해요 */
`;
export default Header;
