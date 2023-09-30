import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../App';
import { search } from '../components/SearchBar';
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import './Cards.css'
import './CardEffects.css'
import Title from './Title';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineExpand } from 'react-icons/ai';

export default function FavoriteCards() {
  const navigate = useNavigate();
  const [favoriteCards, setFavoriteCards] = useState([]);
  const { setIsLoading, snackbar, roleType, user, searchWord } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/cards/favorite?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setFavoriteCards(data);
      })
      .catch(() => {
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);
 
  const unfavorite = (id) => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/cards/${id}/unfavorite?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
    })
      .then(() => {
        setFavoriteCards(favoriteCards.filter(c => c.id !== id));
        snackbar("Card removed from favorites");
      })
      .catch(() => {
        snackbar('Failed to Remove from Favorites');
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }
  
  return (
    <div className='mainDiv'>
      <span className='title8'><h1>Cardify+</h1>
        <p>Here you'll find all your favorite Cards</p>
        {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
      </span>
      {favoriteCards.length ?

        <div className='Cardframe'>
          {
            favoriteCards.filter(c => search(searchWord, c.title, c.description, c.subTitle)).map(c =>
              <div key={c.id} className='Card3'>
              <div className='img' style={{ backgroundImage: `url(${c.imgUrl})`,  border: '0',}}></div>
                <h1>{c.title}</h1>
                <div>
                  <p><b>Phone:</b>{c.phone}</p>
                  <p><b>Adress:</b> {c.houseNumber} {c.street} <br /> {c.country}, {c.city}  {c.zip}</p>
                  <p><b>Card Number:</b>{c.id}</p>
                </div>
                <div className='myIcons'>
                  <div className='icons1'>
                    <span className='Heart' onClick={() => unfavorite(c.id)}> {user && <BsFillHeartFill style={{ color: "red" }} size={26} />}</span>
                    <span className='Phone'><FaPhoneAlt size={26} /></span>
                      <Link to={`/cards/${c.id}`}><span className='Expand'><AiOutlineExpand size={26} /></span></Link>
                  </div>
                  <div className='sep'></div>
                </div>
              </div>
            )
          }

        </div>
        : <Title />
      }
    </div>
  )
}


