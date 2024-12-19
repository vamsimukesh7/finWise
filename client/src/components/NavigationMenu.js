import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from './Images/stats.png'

export default function NavigationMenu() {

  const Location = useLocation();

  return (
    <div className='NavigationMenu fixed-top slide-down'>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <Link to='/Homepage' class="navbar-brand" ><img src={logo} alt='...'/></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to='/MyProfile' class={Location.pathname === '/MyProfile' ? 'nav-link active' : 'nav-link'} aria-current="page">My Profile</Link>
              </li>
              <li class="nav-item">
                <Link to='/Budgeting' class={Location.pathname === '/Budgeting' ? 'nav-link active' : 'nav-link'} >Budget</Link>
              </li>
              <li class="nav-item">
                <Link to='/Investing' class={Location.pathname === '/Investing' ? 'nav-link active' : 'nav-link'} href="...">Investing</Link>
              </li>
              <li class="nav-item">
                <Link to='/TaxSaving' class={Location.pathname === '/TaxSaving' ? 'nav-link active' : 'nav-link'} href="...">Tax Saving</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
