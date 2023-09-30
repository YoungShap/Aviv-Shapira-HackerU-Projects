import React from 'react'
import './ErrorPage.css'
import { BiSolidErrorAlt } from 'react-icons/bi'

export default function ErrorPage() {
  return (
    <div className='my-error-page'>
        <BiSolidErrorAlt className='warning-icon' size={80} color='red'/>
        <p><b>ERROR 404</b> , Oops! Wrong Page.</p>
    </div>
  )
}
