import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Header';
import Search from './Search';
import Genre from './Genre';
import ShowCards from './ShowCards';
import Footer from './Footer';
import Lists from './Lists';
import Details from './Details';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={ <div> <Search /> <Genre /> <ShowCards /> </div> } />
          <Route path="/Lists" element={<Lists />} />
          <Route path="/Details" element={<Details />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
