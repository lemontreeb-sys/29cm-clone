import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const ProductSection = ({ sectionData, likedId, onToggle }) => {
  return (
    <SectionWrapper>
      <MainImage>
        <img src={sectionData.mainImage}></img>
      </MainImage>
      <InfoWrapper>
        <h3>{sectionData.title}</h3>
        <p>{sectionData.subtitle}</p>
      </InfoWrapper>
      {sectionData.products.map((product) => (
        <ProductCard
          key={product.id}
          data={product}
          likedId={likedId}
          onToggle={onToggle}
        ></ProductCard>
      ))}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  display: flex;
  padding-top: 40px;
  width: 100%;
  flex-direction: column;
`;
const MainImage = styled.article`
  height: 360px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  gap: 12px;
  align-items: start;

  h3 {
    font-size: 20px;
    font-weight: 800;
    margin: 0;
  }

  p {
    font-size: 14px;
    word-break: keep-all;
    text-align: start;
    font-weight: 500;
  }
`;

export default ProductSection;
