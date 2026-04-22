import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ data, likedId, onToggle }) => {
  const isLiked = likedId.includes(data.id);
  const displayCount = isLiked ? data.heartCount + 1 : data.heartCount;
  return (
    <CardWrapper>
      <StyledLink to={`/product/${data.id}`}>
        <CardInfo>
          <CardImage>
            <img src={data.image}></img>
          </CardImage>
          <TextSec>
            <h3>{data.brand}</h3>
            <p>{data.name}</p>
            <PriceSec>
              <Discount>{data.discountRate}%</Discount>
              <p>{data?.price?.toLocaleString()}원</p>
            </PriceSec>
            <Tag>
              {data?.tags?.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </Tag>
          </TextSec>
        </CardInfo>
      </StyledLink>
      <CardLike $isLiked={isLiked} onClick={() => onToggle(data.id)}>
        <button className="icon">
          <Heart
            size={22}
            color={isLiked ? "#f64346" : "#8b8b8b"}
            fill={isLiked ? "#f64346" : "none"}
            strokeWidth={1.5}
          ></Heart>
        </button>
        <span class="like-count">{displayCount.toLocaleString()}</span>
      </CardLike>
    </CardWrapper>
  );
};

const CardWrapper = styled.section`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 10px 10px 10px 0px;
  border-top: 1px solid #d3d3d3;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const CardImage = styled.div`
  width: 78px;
  height: 78px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    object-fit: cover;
    object-position: center;
  }
`;

const CardInfo = styled.article`
  display: flex;
  gap: 16px;
  align-items: center;
  h3 {
    font-size: 12px;
    margin: 0;
    font-weight: 700;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const TextSec = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: column;
`;
const PriceSec = styled.div`
  display: flex;
  gap: 4px;
  p {
    font-size: 12px;
    font-weight: 800;
  }
`;

const Discount = styled.p`
  color: #ff3636;
`;

const Tag = styled.div`
  border-radius: 2px;
  padding: 2px 2px;
  font-size: 10px;
  display: flex;
  gap: 4px;
  span {
    background-color: #efefef;
    color: #4d4d4d;
    padding: 2px 4px;
    border-radius: 2px;
    font-weight: 600;
  }
`;

const CardLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 24px;
    height: 24px;
  }
  span {
    font-size: 12px;
    color: #8b8b8b;
    font-weight: 600;
  }
`;
export default ProductCard;
