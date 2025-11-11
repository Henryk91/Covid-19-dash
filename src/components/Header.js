import React from 'react';
import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content" className="grey-border">
        <p id="dashboard-title">Coronavirus COVID-19 Global Cases by the Center</p>
      </Container>
    </header>
  );
};

export default Header;
