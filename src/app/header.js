"use client"; // Assurez-vous que ce fichier est bien un composant côté client
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import './global.scss';
import './bootstrap.css';

const Header = () => {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  if (!isClient) {
    return null; // Rendre null ou un autre fallback jusqu'à ce que le composant soit monté côté client
  }

  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="/">
            <img src="S.ico" alt="Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""> </span>
          </button>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link fontWhite" href="/#home">Accueil <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link fontWhite" href="/#pricing">Tarification</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fontWhite" href="/#features">Fonctionnalités</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fontWhite" href="/#contact">Contact</a>
              </li>
              {status === "authenticated" ? (
                <>
<li className="nav-item dropdown">
  <span className="nav-link fontWhite special" onClick={toggleDropdown}>
    Bonjour, {session.user.pseudo || session.user.email} <span className="dropdown-toggle"></span>
  </span>
  {dropdownVisible && (
    <ul className="dropdown-menu show">
      <li className="dropdown-item full-width pointer nodeco" >
        <a className="fontblack" href="/dashboard">Tableau de bord</a>
      </li>
      <li className="dropdown-item full-width pointer" onClick={() => signOut()}>
        <button className="fontblack" >Se déconnecter</button>
      </li>
      <li className="dropdown-item full-width centered pointer" onClick={closeDropdown}>
        <button className="fontblack" >✖</button>
      </li>
    </ul>
  )}
</li>

                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link fontWhite nodeco" >
                    <a href="/login" className='fontWhite '>

                    Se connecter / S&apos;inscrire
                    </a>
                    </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
