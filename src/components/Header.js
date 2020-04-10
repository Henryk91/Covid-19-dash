import React from 'react';
import { Link } from 'gatsby';
import menu from '../assets/images/menu-24px.svg'
import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content" className="grey-border">
        <p id="dashboard-title">Coronavirus COVID-19 Global Cases by the Center</p>
        <ul>
          <li>
          <svg id="menu-button" src={menu} alt="menu" />
          <img src="../assets/images/menu-24px.png" />
      
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/page-2/">Page 2</Link>
          </li> */}
        </ul>
        {/* <Link to="/page-2/">Page 2</Link> */}
      </Container>
    </header>
  );
};

export default Header;
