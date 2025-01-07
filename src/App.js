import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameMainPage from './modules/GameMainPage';

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<GameMainPage />} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
