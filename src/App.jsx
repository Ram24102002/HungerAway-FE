import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import FoodDonationForm from './Pages/FoodDonationForm';
import FoodDonationList from './Pages/FoodDonationList';
import IndianCityCards from './Pages/IndianCityCards';
import Nav from './Components/Nav';
import ContactPage from './Pages/ContactPage';
import AboutUs from './Pages/AboutUs';
import InboxRestrict from './Pages/InboxRestrict';



function AppContent() {
  const location = useLocation();
  const hideLayoutNav = ["/ContactPage","/InboxRestrict"]; // Remove Nav

  const shouldHideLayoutNav = hideLayoutNav.includes(location.pathname);


  // This will wake your API whenever someone opens your site
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/ping`)
    .then(res => res.text())
    .then(console.log)
    .catch(console.error);
}, []);



  return (
    <>
      {!shouldHideLayoutNav && <Nav />}

{/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FoodDonationForm" element={<FoodDonationForm />} />
        <Route path='/FoodDonationList' element={<FoodDonationList />} />
        <Route path='/IndianCityCards' element={<IndianCityCards />} />
        <Route path='/ContactPage' element={<ContactPage />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/InboxRestrict' element={<InboxRestrict />} />
      </Routes>

      {/* {!shouldHideLayoutFooter && <Footer />} */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
