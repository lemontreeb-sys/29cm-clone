import React from "react";
import { theme } from "./styles/Theme";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Home from "./pages/Home";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LikePage from "./pages/LikePage";
import { useEffect } from "react";
import ProductDetail from "./pages/ProductDetail";
import MainLayout from "./components/layout/MainLayout";
import Header from "./components/layout/Header";
import Cart from "./pages/Cart";
import HeaderLayout from "./components/layout/HeaderLayout";

function App() {
  const [likedId, setLikedId] = useState(() => {
    const saved = localStorage.getItem("likedItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedId));
  }, [likedId]);

  const toggleLike = (productId) => {
    setLikedId((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle></GlobalStyle>
        <Mobile>
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route element={<MainLayout></MainLayout>}>
                <Route
                  path="/"
                  element={<Home likedId={likedId} onToggle={toggleLike} />}
                />
                <Route
                  path="/like"
                  element={<LikePage likedId={likedId} onToggle={toggleLike} />}
                />
              </Route>
              <Route
                path="/product/:id"
                element={
                  <ProductDetail
                    likedId={likedId}
                    onToggle={toggleLike}
                  ></ProductDetail>
                }
              ></Route>
            </Route>

            <Route path="/cart" element={<Cart></Cart>}></Route>
          </Routes>
        </Mobile>
      </ThemeProvider>
    </>
  );
}

const Mobile = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  overflow-x: hidden;
`;
const MainContent = styled.main`
  padding: 50px 20px 70px;
  width: 100%;
`;

export default App;
