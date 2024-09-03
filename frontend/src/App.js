import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './Pages/DetailPage';
import MainPage from './Pages/MainPage';
import WrittingPage from './Pages/WrittingPage';
import ContinuingStory from './Pages/ContiuingStory';
import Top10 from './Pages/Top10';

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
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/writtingpage" element={<WrittingPage />} />
        <Route path="/continuingstory" element={<ContinuingStory />} />
        <Route path="/Top10" element={<Top10 />} />
      </Routes>
    </>
  );
}

export default App;
