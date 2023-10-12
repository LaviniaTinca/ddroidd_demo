import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import SuccessPage from './pages/SuccessPage';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/join' element={<JoinPage />} />
        <Route path='/success' element={<SuccessPage/>} />
      </Route>
    </Routes>
  );
};

export default App;
