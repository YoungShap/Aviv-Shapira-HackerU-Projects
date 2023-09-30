import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../App';
import './CardExpand.css'

export default function CardExpand() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [oneCard, setOneCard] = useState({
    id: Number,
    title: '',
    description: '',
    phone: '',
    street: '',
    country: '',
    city: '',
    zip: '',
    imgUrl: '',
  });
  const { setIsLoading, snackbar } = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/cards/${id}?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setOneCard(data);
      })
      .catch(() => {
        snackbar("No Card Availible");
        navigate('/error');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  return (
    <div className='one-card-frame'>
      <div className='one-card'>
        <div className='landing-page'>
          <div className='image-container'>
            <img src={oneCard.imgUrl} alt={oneCard.title} />
          </div>
        </div>
        <h1>{oneCard.title}</h1>
        <div className='card-content'>
          <h2><b>About {oneCard.title}:</b></h2>
          <p>{oneCard.description}</p>
          <p><b>Phone:</b> {oneCard.phone}</p>
          <p><b>Address:</b> {oneCard.houseNumber} {oneCard.street} <br /> {oneCard.country}, {oneCard.city} {oneCard.zip}</p>
          <p><b>Card Number:</b> {oneCard.id}</p>
        </div>
      </div>
    </div>
  );
}

