import React from "react";
import ProductCard from "../components/product/ProductCard";
import { curationData } from "../data/curationData";
import { Section } from "lucide-react";
import styled from "styled-components";
import { useEffect } from "react";

const LikePage = ({ likedId, onToggle }) => {
  const allProducts = curationData.flatMap((section) => section.products);
  const likeProducts = allProducts.filter((item) => likedId.includes(item.id));
  return (
    <PageWrapper>
      <Title>좋아요 목록({likeProducts.length})</Title>
      <ListSec>
        {likeProducts.map((item) => (
          <ProductCard
            key={item.id}
            data={item}
            likedId={likedId}
            onToggle={onToggle}
          ></ProductCard>
        ))}
      </ListSec>
    </PageWrapper>
  );
};
const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #000;
`;

const ListSec = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default LikePage;
