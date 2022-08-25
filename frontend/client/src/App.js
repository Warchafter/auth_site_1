import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { checkAuth } from 'features/user';

import HomePage from "containers/HomePage";
import DashboardPage from "containers/DashboardPage";
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";


const App = () =>  {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Dashboard' element={<DashboardPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Register' element={<RegisterPage />} />
      </Routes>
    </Router>
  )
};

export default App;