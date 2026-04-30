import React from "react";
import { Home, Search, Menu, Heart, User } from "lucide-react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const navItems = [
    { name: "홈", icon: Home, path: "/" },
    { name: "카테고리", icon: Menu, path: "/category" },
    { name: "검색", icon: Search, path: "/search" },
    { name: "좋아요", icon: Heart, path: "/like" },
    { name: "마이페이지", icon: User, path: "/mypage" },
  ];

  const handleNavClick = (e, item) => {
    const allowedPaths = ["/", "/like"];

    if (!allowedPaths.includes(item.path)) {
      e.preventDefault();
      alert(`'${item.name}' 페이지는 현재 준비 중입니다. `);
    }
  };

  return (
    <NavContainer>
      {navItems.map((item) => {
        const CurrentIcon = item.icon;
        return (
          <NavItem
            key={item.name}
            to={item.path}
            onClick={(e) => handleNavClick(e, item)}
          >
            {({ isActive }) => (
              <>
                <CurrentIcon
                  color={isActive ? "#000" : "#727272"}
                  size={22}
                ></CurrentIcon>
                <NavText $active={isActive}>{item.name}</NavText>
              </>
            )}
          </NavItem>
        );
      })}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -1px;
  width: 100%;
  z-index: 10;
  background-color: rgba(247, 247, 247, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  max-width: 430px;
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 16px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  cursor: pointer;
  color: #5b5b5b;
  .active {
    color: #000;
  }
`;

const NavText = styled.span`
  font-size: 10px;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
`;
export default BottomNav;
