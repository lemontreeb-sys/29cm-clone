import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  );
};

const MainContent = styled.main`
  padding-top: 43px;
  width: 100%;
`;

export default HeaderLayout;
