import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

export const Header = ({ onLogin, onLogout, onCreateAccount }) => (
  <header>
    <img src={logo} alt="One Dollar Promise Logo" />
  </header>
);

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
};
