import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import Layout from './pages/Layout';
import './App.css';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/join' element={<JoinPage />} />
      </Route>
    </Routes>
  );
};

export default App;
