import React from "react";
import MainBanner from "../components/home/MainBanner";
import ProductSection from "../components/product/ProductSection";
import { curationData } from "../data/curationData";
import CategoryNav from "../components/layout/CategoryNav";
import styled from "styled-components";
import { useState } from "react";

const Home = ({ onToggle, likedId }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const currentSection = curationData.find(
    (item) => item.category === activeCategory,
  );
  return (
    <div>
      <CategoryNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      ></CategoryNav>
      <NavSpace></NavSpace>
      {activeCategory === "all" ? (
        <>
          <MainBanner></MainBanner>
          {curationData.map((item) => (
            <ProductSection
              key={item.id}
              sectionData={item}
              likedId={likedId}
              onToggle={onToggle}
            ></ProductSection>
          ))}
        </>
      ) : (
        currentSection && (
          <div key={currentSection.id}>
            <MainBanner
              img={currentSection.mainImage}
              title={currentSection.title}
            />
            <ProductSection
              sectionData={currentSection}
              likedId={likedId}
              onToggle={onToggle}
            />
          </div>
        )
      )}
    </div>
  );
};

const NavSpace = styled.div`
  height: 38px;
`;

export default Home;
