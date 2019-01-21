import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from 'react-icons/fa';

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {

         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);

         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');

       });
     });
   }
 }

 render() {
   return (

  <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <h1 class="title">Charlotte Christien</h1>
        </Link>
        {/* Hamburger menu */}
        <div className="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" className="navbar-menu">
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/about">
          Bio
        </Link>
        <Link className="navbar-item" to="/products">
          My Work
        </Link>
        <Link className="navbar-item" to="/contact">
          Portfolio
        </Link>
      </div>
      <div className="navbar-end has-text-centered">
        <a href="https://twitter.com/yesCharlieyesss" className="icon"><FaFacebookSquare /></a>
        <a href="https://www.facebook.com/officialcharlottechristien/" className="icon"><FaTwitterSquare /></a>
        <a href="https://www.instagram.com/charlottechristien/" className="icon"><FaInstagram /></a>
      </div>
      </div>
    </div>
  </nav>
  )}
}

export default Navbar
