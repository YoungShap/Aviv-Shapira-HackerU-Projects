import React, { useContext, useEffect, useState } from 'react'
import { GeneralContext } from '../App';
import { search } from '../components/SearchBar';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { MdBusinessCenter } from 'react-icons/md';
import { BiSolidUser } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import './SandBox.css'
import { Link, useNavigate } from 'react-router-dom';

export default function ClientManagement() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const { setIsLoading, snackbar, roleType, user, searchWord } = useContext(GeneralContext);


  useEffect(() => {  // a function that gets all clients from the API //
    fetch(`https://api.shipap.co.il/admin/clients?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setClients(data);
      })
      .catch(() => {
        navigate('/error');
      })
  }, [])
  const removeClient = (id) => {
    if (!window.confirm('Are you sure you want to remove this client?')) {  // a function for removing a client //
      return;
    }

    fetch(`https://api.shipap.co.il/admin/clients/${id}?token=1b2789ce-44e7-11ee-ba96-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then(() => {
        setClients(clients.filter(c => c.id !== id));
      })
      .catch(() => {
        snackbar("Cannot remove Client");
        navigate('/error');
      })
  }

  return (
    <div className='big-container'>
      <span className='title8'><h1>Admin Sandbox</h1>
        <p>Manage all Clients </p>
        {searchWord && <p className='activeSearch'>Active Search({searchWord})</p>}
      </span>
      <div className='clients-container1'>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Options</th>
              <th>User Level</th>
            </tr>
          </thead>
          <tbody>
            {
              clients.filter(c => search(searchWord, c.firstName, c.lastName, c.email)).map(c =>
                <tr key={c.id}>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.country}</td>
                  <td className='icons'>
                  <Link to={`/admin/clients/${c.id}`}> <span className='edit'>
                     <FiEdit size={22} />
                    </span></Link>
                    <span className='delete'>
                      <BsFillTrash3Fill size={22} onClick={() => removeClient(c.id)} />
                    </span>
                  </td>
                  <td>{ c.business ? <MdBusinessCenter size={24}/> : <BiSolidUser size={24}/>}</td>
                </tr>
              )

            }
          </tbody>
        </table>

      </div>
    </div>
  )
}
