import React from "react";
import styled from "styled-components";

const categories = ["NOW", "우먼", "뷰티", "홈", "랭킹", "발견", "맨"];

const CategoryNav = () => {
  return (
    <NavContainer>
      <NavList>
        {categories.map((item, index) => (
          <NavItem key={index} $active={item === "NOW"}>
            {item}
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  padding: 0 20px;
  top: 44px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  //left: 50%;
  //transform: translateX(-50%);
  background-color: #fff;
  width: 100%;
  max-width: 430px;
  z-index: 10;
  height: 44px;
  padding-bottom: 10px;
  box-sizing: border-box;
`;

const NavList = styled.ul`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavItem = styled.li`
  padding: 6px 16px;
  font-size: 14px;
  border: 1.5px solid #ddd;
  border-radius: 40px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  border: ${({ $active }) =>
    $active ? "1.5px solid #000" : "1.5px solid #d4d4d4"};
  color: ${({ $active }) => ($active ? "#000" : "#383838")};
`;

export default CategoryNav;
