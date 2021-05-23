import React from 'react';
import { Link } from 'react-router-dom';
// import {Icon} from 'semantic-ui-react';
import Logo from '../../images/logo64.png';
import styles from './styles.module.scss';
const Header = () => {
  return (
    <header className={styles.header}>
      <figure className={styles.figure}>
        <img src={Logo} alt='Heart in teal color with app name in white'/>
      </figure>
      <nav>     
        <h1>Personal Health Tracker</h1>  
        {/* <Icon name='home' color='teal' size='huge'/> */}
        <div><Link to='/'>Home</Link></div>
      </nav>
    </header>
  );
};

export default Header;
