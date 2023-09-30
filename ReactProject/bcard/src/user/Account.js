import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../App';
import { BiRefresh } from 'react-icons/bi';
import '../cards/Form.css'
import { useNavigate } from 'react-router-dom';
import { editSchema } from '../Config';

export default function Account() {
  const { setIsLoading, snackbar, user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    imgUrl: '',
    imgAlt: '',
    state: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
    zip: '',
    business: false,
  });
  
  useEffect(() => {
    setIsLoading(true);
    if (user) {
      setFormData(user);
    } else {
      snackbar('Error, No User Found!');
    }
    setIsLoading(false);
  }, [user])

  const handleInputChange = (ev) => {
    const { id, value, type, checked } = ev.target;
    let obj;

    if (type === 'checkbox') {
      obj = {
        ...formData,
        [id]: checked,
      };
    } else {
      obj = {
        ...formData,
        [id]: value,
      };
    }
    const schema = editSchema.validate(obj, { abortEarly: false, allowUnknown: true, });
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
    fetch(`https://api.shipap.co.il/clients/update?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(data => {
        if (data.ok) {
          setUser(formData);
          navigate('/');
          snackbar('User updated sucessefully');
        }
      })
      .catch(err => {
        navigate('/error');
        snackbar(err.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="container2">
      <h2>My Account</h2>
      <form>
        <div className='row'>
          <div className='column'>
            <label>First name*</label>
            <input type="text" id='firstName' value={formData.firstName} onChange={handleInputChange} />
            {errors.firstName ? <div className='fieldError'>{errors.firstName}</div> : ''}
          </div>
          <div className='column'>
            <label>Middle Name</label>
            <input type="text" id='middleName' value={formData.middleName} onChange={handleInputChange} />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>Last name*</label>
            <input type="text" id='lastName' value={formData.lastName} onChange={handleInputChange} />
            {errors.lastName ? <div className='fieldError'>{errors.lastName}</div> : ''}
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
            <label>Password*</label>
            <input type="password" id='password' value={formData.password} onChange={handleInputChange} />
            {errors.password ? <div className='fieldError'>{errors.password}</div> : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>Image URL</label>
            <input type="text" id='imgUrl' value={formData.imgUrl} placeholder='Image url' onChange={handleInputChange} />
          </div>
          <div className='column'>
            <label>Image ALT</label>
            <input type="text" id='imgAlt' value={formData.imgAlt} placeholder='Image alt' onChange={handleInputChange} />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>State</label>
            <input type="text" id='state' value={formData.state} placeholder='State' onChange={handleInputChange} />
          </div>
          <div className='column'>
            <label>Country</label>
            <input type="text" id='country' value={formData.country} placeholder='Country*' onChange={handleInputChange} />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>City</label>
            <input type="text" id='city' value={formData.city} placeholder='City*' onChange={handleInputChange} />
          </div>
          <div className='column'>
            <label>Street</label>
            <input type="text" id='street' value={formData.street} placeholder='Street*' onChange={handleInputChange} />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label>House Number</label>
            <input type="number" id='houseNumber' value={formData.houseNumber} placeholder='House number*' onChange={handleInputChange} />
          </div>
          <div className='column'>
            <label>Zip</label>
            <input type="number" id='zip' value={formData.zip} placeholder='Zip' onChange={handleInputChange} />
          </div>
        </div>
        <div className='options2'>
          <div className='actions'>
            <button className='cancel'>CANCEL</button>
            <button className='refresh'><BiRefresh size={22} /></button>
          </div>
          <button className='submitG' disabled={!isValid} onClick={save}>SUBMIT</button>
        </div>
      </form>
    </div>
  )
}