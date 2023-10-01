import { Route, Routes } from 'react-router-dom';
import Cards from './cards/Cards';
import Login from './user/Login';
import MyCards from './cards/MyCards';
import FavoriteCards from './cards/FavoriteCards';
import Signup from './user/Signup';
import Account from './user/Account';
import ClientManagement from './admin/ClientManagement';
import About from './pages/About';
import CardExpand from './cards/CardExpand';
import ErrorPage from './components/ErrorPage';



export default function RouterAuth() {// this router is for when there is no user  //
    return (
        <Routes>
            <Route path="/" element={<Cards/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/business/cards' element={<ErrorPage />} />
            <Route path='/cards/favorite' element={<ErrorPage />} />
            <Route path='/admin/clients' element={<ErrorPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/business/cards/new' element={<ErrorPage />} />
            <Route path='/business/cards/:id' element={<ErrorPage />} />
            <Route path='/admin/clients/:id' element={<ErrorPage/>} />
            <Route path='/cards/:id' element={<CardExpand/>} />
            <Route path='/account' element={<ErrorPage/>} />
            <Route path="*" element={<ErrorPage/>} />
            <Route path="/error" element={<ErrorPage/>} />
        </Routes>
    )
}
