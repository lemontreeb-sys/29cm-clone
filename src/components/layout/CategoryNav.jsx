import React from "react";
import styled from "styled-components";
import { curationData } from "../../data/curationData";

const CategoryNav = ({ activeCategory, setActiveCategory }) => {
  return (
    <NavContainer>
      <NavList>
        <NavItem
          $active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          NOW
        </NavItem>

        {/* 3. curationData를 돌면서 각 카테고리 버튼을 생성합니다. */}
        {curationData.map((item) => (
          <NavItem
            key={item.id}
            // 현재 활성화된 카테고리 ID와 데이터의 ID가 일치하는지 확인
            $active={activeCategory === item.category}
            // 클릭 시 부모의 상태를 해당 카테고리 ID로 변경
            onClick={() => setActiveCategory(item.category)}
          >
            {item.label}
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
  left: 0;
  right: 0;
  margin: 0 auto;
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
  gap: 10px;
  overflow-x: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavItem = styled.li`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 80px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border: ${({ $active }) =>
    $active ? "2px solid #000" : "2px solid #e2e2e2"};
  color: ${({ $active }) => ($active ? "#242424" : "#9a9a9a")};
  font-weight: ${({ $active }) => ($active ? "600" : "600")};
`;

export default CategoryNav;
