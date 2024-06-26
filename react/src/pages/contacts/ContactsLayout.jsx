import React from 'react'
import Layout from '../../components/Layout'
import { NavLink } from 'react-router-dom'

const ContactsLayout = ({ children }) => {
    document.title = 'ComparsaConnect - Contactos';

    return (
        <Layout>
            <div className='navbar navbar-expand-lg navbar-light d-flex justify-content-center'>
                <NavLink to="/friends/list" className="nav-link mx-2">Amigos</NavLink>
                <NavLink to="/friends/search" className="nav-link mx-2" >Buscar</NavLink>
                <NavLink to="/friends/friend-request" className="nav-link mx-2" >Solicitudes</NavLink>
                <NavLink to="/friends/pending-request" className="nav-link mx-2" >Enviadas</NavLink>
            </div>
            {children}
        </Layout>
    )
}

export default ContactsLayout
