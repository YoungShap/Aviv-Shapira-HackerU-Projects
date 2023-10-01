import { useContext, useEffect, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { GeneralContext } from '../App';
import '../cards/Form.css'
import '../cards/FormButtons.css'
import { useNavigate, useParams } from 'react-router-dom';
import { editSchema } from '../Config';

export default function ClientEdit() {
    const { id } = useParams();
    const { snackbar, setIsLoading } = useContext(GeneralContext);
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
        fetch("https://api.shipap.co.il/admin/clients?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                if (data.map(d => d.id).includes(+id)) {
                    setFormData(data.filter(c => c.id == id)[0]);
                } else {
                    navigate('/error');
                }
            })
            .catch(() => {
                navigate('/error');
            })
            .finally(() => setIsLoading(false));
    }, [])

    const handleInputChange = (ev) => {  // a function that handles any input change made by the user and upadates the DOM accordingly  //
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
        const schema = editSchema.validate(obj, { abortEarly: false, allowUnknown: true }); // JOI validation (editSchema is in the Config.js file) //
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
    const save = (ev) => {   // a function that saves the changes that were made  //
        ev.preventDefault();
        setIsLoading(true);
        fetch(`https://api.shipap.co.il/admin/clients/${id}?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(data => {
                setFormData(data);
                snackbar("Client saved successfully");
                navigate('/admin/clients');
            })
            .catch(err => {
                snackbar(err.message)
                navigate('/error')
            })
            .finally(() => setIsLoading(false));
    }
    return (
        <div className="container2">
            <h2>Edit Client</h2>
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
                        {errors.imgUrl ? <div className='fieldError'>{errors.imgUrl}</div> : ''}
                    </div>
                    <div className='column'>
                        <label>Image ALT</label>
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
                        <label>Country</label>
                        <input type="text" id='country' value={formData.country} placeholder='Country*' onChange={handleInputChange} />
                        {errors.country ? <div className='fieldError'>{errors.country}</div> : ''}
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <label>City</label>
                        <input type="text" id='city' value={formData.city} placeholder='City*' onChange={handleInputChange} />
                        {errors.city ? <div className='fieldError'>{errors.city}</div> : ''}
                    </div>
                    <div className='column'>
                        <label>Street</label>
                        <input type="text" id='street' value={formData.street} placeholder='Street*' onChange={handleInputChange} />
                        {errors.street ? <div className='fieldError'>{errors.street}</div> : ''}
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <label>House Number</label>
                        <input type="number" id='houseNumber' value={formData.houseNumber} placeholder='House number*' onChange={handleInputChange} />
                        {errors.houseNumber ? <div className='fieldError'>{errors.houseNumber}</div> : ''}
                    </div>
                    <div className='column'>
                        <label>Zip</label>
                        <input type="number" id='zip' value={formData.zip} placeholder='Zip' onChange={handleInputChange} />
                        {errors.zip ? <div className='fieldError'>{errors.zip}</div> : ''}
                    </div>
                </div>
                <div className='business column row'>
                    <label>Business Membership </label>
                    <input type='checkbox' id='business' checked={formData.business} onChange={handleInputChange} />
                </div>
                <div className='options2'>
                    <div className='actions'>
                        <button className='cancel' onClick={() => navigate('/admin/clients')}>CANCEL</button>
                        <button className='refresh'><BiRefresh size={22} /></button>
                    </div>
                    <button className='submitG' disabled={!isValid} onClick={save}>SUBMIT</button>
                </div>
            </form>
        </div>)
}