import React from "react";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MainLayout = () => {
  return (
    <>
      <MainContent>
        <Outlet></Outlet>
      </MainContent>
      <BottomNav></BottomNav>
    </>
  );
};

const MainContent = styled.main`
  padding: 0px 20px 70px;
  width: 100%;
`;

export default MainLayout;
