import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { curationData } from "../data/curationData";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import { Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../components/layout/BottomSheet";

const ProductDetail = ({ likedId, onToggle }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const toggleSheet = () => setIsSheetOpen(!isSheetOpen);
  const allProduct = curationData.flatMap((section) => section.products);
  const product = allProduct.find((item) => item.id === Number(id));
  const isLiked = likedId.includes(product?.id);
  const [isExpanded, setIsExpanded] = useState(false);
  if (!product) return <div>상품정보가 없어요!</div>;

  const handleExpand = () => {
    console.log("버튼 클릭됨! 현재 상태:", isExpanded);
    setIsExpanded(!isExpanded);
  };

  const navigate = useNavigate();
  const handleAddCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      id: product.id,
      name: product.name,
      price: Math.floor(
        product.price - product.price * (product.discountRate / 100),
      ),
      image: product.image,
      brand: product.brand,
      count: 1,
      deliveryInfo: product.deliveryInfo,
      checked: true,
      discountRate: product.discountRate,
    };

    const isExist = existingCart.find((item) => item.id === product.id);
    let updatedCart;

    if (isExist) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item,
      );
    } else {
      updatedCart = [...existingCart, cartItem];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const goToCart = window.confirm(
      `${product.name} 상품이 장바구니에 담겼습니다! 이동할까요?`,
    );
    if (goToCart) {
      navigate("/cart");
    }
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("링크 복사 완료!");
      })
      .catch(() => {
        alert("복사 실패");
      });
  };

  return (
    <DetailSec>
      <ImgSec>
        <img src={product.image}></img>
      </ImgSec>
      <InfoWrapper>
        <MainInfo>
          <h3>{product.brand}</h3>
          <p>{product.name}</p>
          <DiscountWrapp>
            <span className="discount">{product.discountRate}%</span>
            <span>{product.price.toLocaleString()}원</span>
          </DiscountWrapp>
          <ReviewSummary>
            <div className="star-wrapp">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <FaStar key={index} className="star-icon"></FaStar>
              ))}
            </div>
            <span className="count">
              {product.reviewCount?.toLocaleString()}개 리뷰
            </span>
          </ReviewSummary>
          <ColorOption>
            <p>Color</p>
            <div className="chip-wrapp">
              {product.colors?.map((color, index) => (
                <ColorChip key={index} $bgColor={color} title={color} />
              ))}
            </div>
          </ColorOption>
        </MainInfo>
        <SubInfo>
          <div>
            <p>카테고리</p>
            {product.categories.map((id, index) => (
              <span key={index}>
                {id} {index < product.categories.length - 1 && " > "}{" "}
              </span>
            ))}
          </div>
          <div>
            <p>구매 적립금</p>
            <span>{product.point}P</span>
          </div>
          <div>
            <p>배송정보</p>
            <span>{product.deliveryInfo}</span>
          </div>
          <div>
            <p>배송비</p>
            <span>{product.shippingFee}원</span>
          </div>
        </SubInfo>
        <DetailImages $isExpanded={isExpanded}>
          {product.detailImages.map((img, index) => (
            <img key={index} src={img}></img>
          ))}
          {!isExpanded && <Overlay></Overlay>}
        </DetailImages>
        <ExpandButton onClick={handleExpand}>
          {isExpanded ? "상품설명 접기" : "상품설명 더보기"}
        </ExpandButton>
      </InfoWrapper>

      <BuyNav>
        <SubSec>
          <button $isLiked={isLiked} onClick={() => onToggle(product.id)}>
            <Heart
              size={24}
              color={isLiked ? "#f64346" : "#ffffff"}
              fill={isLiked ? "#f64346" : "none"}
              strokeWidth={2}
            ></Heart>
          </button>
          <button onClick={handleShare}>
            <Share2 size={24}></Share2>
          </button>
        </SubSec>
        <MainSec>
          <button onClick={handleAddCart}>장바구니</button>
          <div className="bar"></div>
          <button className="buy-btn" onClick={toggleSheet}>
            구매하기
          </button>
        </MainSec>
      </BuyNav>
      {isSheetOpen && (
        <BottomSheet
          product={product}
          onClose={() => setIsSheetOpen(false)}
        ></BottomSheet>
      )}
    </DetailSec>
  );
};

const DetailSec = styled.section`
  display: flex;
  gap: 16px;
  flex-direction: column;
  position: relative;
  padding: 0px 0px 70px;
`;

const InfoWrapper = styled.div`
  padding: 10px 20px;
`;

const DiscountWrapp = styled.div`
  display: flex;
  font-size: 22px;
  font-weight: 700;

  .discount {
    color: #ff3636;
  }
`;

const ImgSec = styled.div`
  width: 100%;
  height: 480px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainInfo = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h3 {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  }

  p {
    font-size: 14px;
  }
`;

const ReviewSummary = styled.div`
  display: flex;
  gap: 2px;
  font-size: 12px;
  align-items: center;
  padding: 4px 0px 4px;
  font-weight: 500;
  margin-top: 20px;

  .star-wrapp {
    display: flex;
    gap: 2px;
  }
`;

const ColorOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  p {
    font-size: 12px;
    color: #5d5d5d;
    font-weight: 500;
  }
  .chip-wrapp {
    display: flex;
    gap: 4px;
  }
`;

const ColorChip = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #d4d4d4;
  background-color: ${(props) => props.$bgColor};
`;

const SubInfo = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 0px 32px;

  div {
    display: flex;
    gap: 0px;
  }

  p,
  span {
    font-size: 12px;
    color: #313131;
    font-weight: 500;
  }

  p {
    width: 80px;
  }
`;

const DetailImages = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: ${(props) => (props.$isExpanded ? "none" : "600px")};
  overflow: hidden;
  img {
    width: 100%;
    height: 420px;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
`;

const ExpandButton = styled.button`
  width: 100%;
  height: 54px;
  background: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 2px;
  color: #000;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const BuyNav = styled.footer`
  display: flex;
  background-color: #000;
  color: #fff;
  justify-content: space-between;
  padding: 10px 20px;
  height: 68px;
  position: fixed;
  width: 100%;
  max-width: 430px;
  bottom: 0;
  right: 0;
  left: 0;
  align-items: center;
  margin: 0 auto;
`;

const SubSec = styled.div`
  display: flex;
  gap: 20px;

  button {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
`;

const MainSec = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  button {
    color: #fff;
    font-size: 18px;
    font-weight: 800;
    padding: 4px 10px;
    height: 100%;
    letter-spacing: -0.5px;
  }

  .bar {
    height: 18px;
    width: 1px;
    background-color: rgba(255, 255, 255, 0.578);
    display: block;
  }

  .buy-btn {
    color: #ff4800;
    font-weight: 900;
  }
`;

export default ProductDetail;
