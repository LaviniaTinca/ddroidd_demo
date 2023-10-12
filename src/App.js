import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import JoinPage from './pages/join/JoinPage';
// import Layout from './pages/Layout';
import SuccessPage from './pages/success/SuccessPage';
import Navigation from './pages/navigation/Navigation';

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/success' element={<SuccessPage/>} />
      </Route>
    </Routes>
  );
};

export default App;
