import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Snackbar from './components/Snackbar';
import { RoleTypes } from './Config';
import Router from './Router';
import { createContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RouterAuth from './RouterAuth';

export const GeneralContext = createContext();


function App() {
  const [user, setUser] = useState();
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [search, setSearch] = useState();
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const [searchWord, setSearchWord] = useState('');


  const snackbar = text => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(''), 3 * 1000);
  }
  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.shipap.co.il/clients/login", {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text()
            .then(x => {
              throw new Error(x);
            });
        }
      })
      .then(data => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }

        snackbar(`${data.fullName} Is Connected`);
      })
      .catch(err => {
        setRoleType(RoleTypes.none);
        snackbar(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])


  return (
    <>
      <GeneralContext.Provider value={{ user, setUser, setIsLoading, snackbar, roleType, setRoleType, search, setSearch, searchWord, setSearchWord, isDark, setIsDark, RoleTypes}}>
        <Navbar />
       <div className='app-frame'> {user ?
          <Router /> :
          <RouterAuth />
        } </div>
        {isLoading && <Loader />}
        {snackbarText && <Snackbar text={snackbarText} />}
      </GeneralContext.Provider>
          <div className='addCard1'>{[RoleTypes.business, RoleTypes.admin].includes(roleType) && <button className='addCard'><Link to={'/business/cards/new'}>+</Link></button>}</div> 
    </>
  );
}

export default App;
