import { useContext, useState } from 'react';
import Joi from 'joi';
import { BiRefresh } from 'react-icons/bi';
import './Form.css'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';

export default function CreateCard() {
  const { snackbar, setIsLoading } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
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

  const cardSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    subtitle: Joi.string().min(0).max(50).empty(),
    description: Joi.string().min(3).max(500).required(),
    phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `Phone number must have between 10-15 digits.` }).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    web: Joi.string().required(),
    imgUrl: Joi.string().min(0).max(550),
    imgAlt: Joi.string().min(0).max(60),
    state: Joi.string().min(0).max(20),
    country: Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
    street: Joi.string().min(1).required(),
    zip: Joi.string().min(0),
    houseNumber: Joi.string().min(1).max(10).required(),

  });

  const handleInputChange = ev => {
    const { id, value } = ev.target;
    let obj = {
      ...formData,
      [id]: value,
    };

    const schema = cardSchema.validate(obj, { abortEarly: false, allowUnknown: true });
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

  function createCard(ev) {
    ev.preventDefault();

    setIsLoading(true);
    fetch(`https://api.shipap.co.il/business/cards?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        snackbar("Card Added Sucssesfully")
        navigate('/');
      }
      )
      .catch(err => {
        snackbar(err.message);
        navigate('/error');
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="container2">
      <h2>Create Card</h2>

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
            <button className='cancel' onClick={() => navigate('/')}>CANCEL</button>
            <button className='refresh'><BiRefresh size={22} /></button>
          </div>
          <button className='submitG' disabled={!isValid} onClick={createCard}>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}
