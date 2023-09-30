import React, { useContext, useEffect, useState } from 'react'
import { BiRefresh } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../App';
import { cardSchema } from '../Config';

export default function EditCard() {
  const { id } = useParams();
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsLoading, snackbar, } = useContext(GeneralContext);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    imgUrl: '',
    imgAlt: '',
    state: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zip: '',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.shipap.co.il/business/cards/?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setFormData(data.filter(c => c.id == id)[0]);
      })
      .catch(err => { 
        snackbar(err.message)
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }, [])

  const handleInputChange = ev => {
    const { id, value } = ev.target;
    let obj = {
      ...formData,
      [id]: value,
    };

    const schema = cardSchema.validate(obj, { abortEarly: false, allowUnknown:true });
    console.log(schema);
    const err = { ...errors, [id]: undefined };

    if (schema.error) {
      const error = schema.error.details.find(e => e.context.key === id);

      if (error) {
        err[id] = error.message;
      }
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    setFormData(obj);
    setErrors(err);
  };

  const save = (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    fetch(`https://api.shipap.co.il/business/cards/${id}?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(data => {
        setFormData(data);
        snackbar("Card saved successfully");
        navigate('/business/cards');
      })
      .catch(err => {
        snackbar(err.message);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="container2">
      <h2>Edit Card</h2>

      <form>
        <div className='row'>
          <div className='column'>
            <label>title*</label>
            <input type="text" id='title' value={formData.title} onChange={handleInputChange} />
            {errors.title ? <div className='fieldError'>{errors.title}</div> : ''}
          </div>
          <div className='column'>
            <label>subtitle*</label>
            <input type="text" id='subtitle' value={formData.subtitle} onChange={handleInputChange} />
            {errors.subtitle ? <div className='fieldError'>{errors.subtitle}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>description*</label>
            <input type="text" id='description' value={formData.description} onChange={handleInputChange} />
            {errors.description ? <div className='fieldError'>{errors.description}</div> : ''}
          </div>
          <div className='column'>
            <label>Phone*</label>
            <input type="tel" id='phone' value={formData.phone} onChange={handleInputChange} />
            {errors.phone ? <div className='fieldError'>{errors.phone}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>Email*</label>
            <input type="email" id='email' value={formData.email} onChange={handleInputChange} />
            {errors.email ? <div className='fieldError'>{errors.email}</div> : ''}
          </div>
          <div className='column'>
            <label>web*</label>
            <input type="text" id='web' value={formData.web} onChange={handleInputChange} />
            {errors.web ? <div className='fieldError'>{errors.web}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>Image Url*</label>
            <input type="text" id='imgUrl' value={formData.imgUrl} placeholder='Image url' onChange={handleInputChange} />
            {errors.imgUrl ? <div className='fieldError'>{errors.imgUrl}</div> : ''}
          </div>
          <div className='column'>
            <label>Image Alt*</label>
            <input type="text" id='imgAlt' value={formData.imgAlt} placeholder='Image alt' onChange={handleInputChange} />
            {errors.imgAlt ? <div className='fieldError'>{errors.imgAlt}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>State</label>
            <input type="text" id='state' value={formData.state} placeholder='State' onChange={handleInputChange} />
            {errors.state ? <div className='fieldError'>{errors.state}</div> : ''}
          </div>
          <div className='column'>
            <label>Country*</label>
            <input type="text" id='country' value={formData.country} placeholder='Country*' onChange={handleInputChange} />
            {errors.country ? <div className='fieldError'>{errors.country}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>City*</label>
            <input type="text" id='city' value={formData.city} placeholder='City*' onChange={handleInputChange} />
            {errors.city ? <div className='fieldError'>{errors.city}</div> : ''}
          </div>
          <div className='column'>
            <label>Street*</label>
            <input type="text" id='street' value={formData.street} placeholder='Street*' onChange={handleInputChange} />
            {errors.street ? <div className='fieldError'>{errors.street}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>House Number*</label>
            <input type="number" id='houseNumber' value={formData.houseNumber} placeholder='House number*' onChange={handleInputChange} />
            {errors.houseNumber ? <div className='fieldError'>{errors.houseNumber}</div> : ''}
          </div>
          <div className='column'>
            <label>Zip*</label>
            <input type="number" id='zip' value={formData.zip} placeholder='Zip' onChange={handleInputChange} />
            {errors.zip ? <div className='fieldError'>{errors.zip}</div> : ''}
          </div>
        </div>
        <div className='options2'>
          <div className='actions'>
            <button className='cancel' onClick={() => navigate('/business/cards')}>CANCEL</button>
            <button className='refresh'><BiRefresh size={22} /></button>
          </div>
          <button className='submitG' disabled={!isValid} onClick={save}>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}
