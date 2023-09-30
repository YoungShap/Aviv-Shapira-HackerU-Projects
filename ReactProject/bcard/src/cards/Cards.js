import React, { useContext, useEffect, useState } from 'react'
import './Cards.css'
import './CardEffects.css'
import './Title.css'
import { FaPhoneAlt } from 'react-icons/fa';
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { AiOutlineExpand } from 'react-icons/ai';
import { GeneralContext } from '../App';
import { search } from '../components/SearchBar';
import { Link, useNavigate } from 'react-router-dom';


export default function Cards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const { setIsLoading, snackbar, roleType, user, searchWord } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/cards?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setCards(data);
      })
      .catch(() => {
        snackbar("No Cards Availible");
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  const adminRemove = (id) => {
    if (!window.confirm('Are you sure you want to remove this card?')) {
      return;
    }

    fetch(`https://api.shipap.co.il/admin/cards/${id}?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => {
        setCards(cards.filter(c => c.id !== id));
        snackbar('Card removed sucessfully!')
      })
      .catch(() => {
        snackbar('Failed to delete Card');
      });
  }
  const favorite = (card) => {
    fetch(`https://api.shipap.co.il/cards/${card.id}/favorite?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
    })
      .then(() => {
        snackbar("Card added to favorites");
        card.favorite = true;
      })
      .catch(() => {
       snackbar('Failed to Favorite');
      })
  }

  const unfavorite = (card) => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/cards/${card.id}/unfavorite?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
    })
      .then(() => {
        snackbar("Card removed from favorites");
        card.favorite = false;
      })
      .catch(() => {
        snackbar('Error')
      })
      .finally(() => setIsLoading(false));
  }


  return (
    <div className='mainDiv'>
      <span className='title8'><h1>Cardify+</h1>
        <p>Here are some Cards from our Clients around the world </p>
        {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
      </span>
      <div className='Cardframe'>
        {
          cards.filter(c => search(searchWord, c.title, c.description, c.subTitle)).map(c =>
            <div key={c.id} className='Card3'>
              <div className='img' style={{ backgroundImage: `url(${c.imgUrl})`, border: '0', }}></div>
              <h1>{c.title}</h1>
              <div className='my-p'>
                <p><b>Phone:</b>{c.phone}</p>
                <p><b>Adress:</b> {c.houseNumber} {c.street} <br /> {c.country}, {c.city}  {c.zip}</p>
                <p><b>Card Number:</b>{c.id}</p>
              </div>
              <div className='myIcons'>
                <div className='icons1'>
                  <span > {user && <BsFillHeartFill className='Heart' size={26} style={{ color: c.favorite ? 'red' : 'rgb(51, 49, 49)' }} onClick={() => c.favorite ? unfavorite(c) : favorite(c)} />}</span>
                  <span className='Phone'><FaPhoneAlt size={26} /></span>
                  <Link to={`/cards/${c.id}`}><span className='Expand'><AiOutlineExpand size={26} /></span></Link>
                </div>
                <div className='sep'></div>
                <div className='icons2'>
                  {roleType === 3 && <BsFillTrash3Fill className='Trash' size={26} onClick={ev => adminRemove(c.id)} />}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
