import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './Pages/DetailPage';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';

const GlobalStyle = createGlobalStyle`
  body {
    background: #FFF;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<DetailPage />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;


