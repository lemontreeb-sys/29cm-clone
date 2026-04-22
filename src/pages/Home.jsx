import React from "react";
import MainBanner from "../components/home/MainBanner";
import ProductSection from "../components/product/ProductSection";
import { curationData } from "../data/curationData";
import CategoryNav from "../components/layout/CategoryNav";
import styled from "styled-components";

const Home = ({ onToggle, likedId }) => {
  return (
    <div>
      <CategoryNav></CategoryNav>
      <NavSpace></NavSpace>
      <MainBanner></MainBanner>
      {curationData.map((item) => (
        <ProductSection
          key={item.id}
          sectionData={item}
          likedId={likedId}
          onToggle={onToggle}
        ></ProductSection>
      ))}
    </div>
  );
};

const NavSpace = styled.div`
  height: 38px;
`;
export default Home;
