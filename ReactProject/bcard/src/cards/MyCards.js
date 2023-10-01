import { GeneralContext } from '../App';
import './Cards.css'
import './CardEffects.css'
import CreateCard from './CreateCard'
import React, { useContext, useEffect, useState } from 'react'
import { BsFillHeartFill, BsFillTrash3Fill } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { search } from '../components/SearchBar';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';



export default function MyCards() {
  const navigate = useNavigate('/');
  const [businessCards, setBusinessCards] = useState([]);
  const { setIsLoading, snackbar, roleType, searchWord, user } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/business/cards?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, { // a function that gets all cards created by the user that is currently logged in  //
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setBusinessCards(data);
      })
      .catch(() => {
        snackbar("No Cards Availible");
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [])

  const removeCard = (id) => {
    if (!window.confirm('Are you sure you want to remove this card?')) { // a function that allows user to delete their own cards //
      return;
    }

    fetch(`https://api.shipap.co.il/business/cards/${id}?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => {
        setBusinessCards(businessCards.filter(c => c.id !== id));
      })
      .catch(() => {
        snackbar("Cannot remove Card");
      })
  }
  const favorite = (card) => { //a function that allows to favorite //
    fetch(`https://api.shipap.co.il/cards/${card.id}/favorite?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
    })
      .then(() => {
        snackbar("Card added to favorites");
        card.favorite = true;
      })
      .catch(() => {
        snackbar('Error');
      })
  }

  const unfavorite = (card) => { // a function that allows to unfavorite //
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
        snackbar('Error');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className='mainDiv'>
        <span className='title8'><h1>Cardify+</h1>
          <p>Here you'll find the Cards you created</p>
        {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
      </span>
      {businessCards.length ?
        <div className='Cardframe'>
        {
          businessCards.filter(c => search(searchWord, c.title, c.description, c.subTitle)).map(c =>
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
                  <span> {user && <BsFillHeartFill  className='Heart' size={26} style={{ color: c.favorite ? 'red' : 'rgb(51, 49, 49)' }} onClick={() => c.favorite ? unfavorite(c) : favorite(c)}/>}</span>
                  <a href={`tel:${c.phone}`} className='Phone'><FaPhoneAlt size={26} /></a>
                    <Link className='Edit' to={`/business/cards/${c.id}`}><span><FiEdit size={26} /></span></Link>
                  </div>
                  <div className='sep'></div>
                  <div className='icons2'>
                    {<BsFillTrash3Fill className='Trash' size={26} onClick={ev => removeCard(c.id)} />}
                  </div>
                </div>
              </div>
            )
          }
        </div>
        : <CreateCard />
      }
    </div>
  )
}