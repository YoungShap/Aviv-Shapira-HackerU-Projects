import { Route, Routes } from 'react-router-dom';
import Cards from './cards/Cards';
import MyCards from './cards/MyCards';
import FavoriteCards from './cards/FavoriteCards';
import Account from './user/Account';
import ClientManagement from './admin/ClientManagement';
import About from './pages/About';
import CreateCard from './cards/CreateCard';
import EditCard from './cards/EditCard';
import ClientEdit from './admin/ClientEdit';
import CardExpand from './cards/CardExpand';
import ErrorPage from './components/ErrorPage';



export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Cards/>} />
            <Route path='/business/cards' element={<MyCards />} />
            <Route path='/cards/favorite' element={<FavoriteCards />} />
            <Route path='/admin/clients' element={<ClientManagement />} />
            <Route path='/business/cards/new' element={<CreateCard />} />
            <Route path='/business/cards/:id' element={<EditCard />} />
            <Route path='/admin/clients/:id' element={<ClientEdit/>} />
            <Route path='/cards/:id' element={<CardExpand/>} />
            <Route path='/account' element={<Account/>} />
            <Route path='/about' element={<About />} />
            <Route path="*" element={<ErrorPage/>} />
            <Route path="/error" element={<ErrorPage/>} />
        </Routes>
    )
}
