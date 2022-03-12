import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../../containers/common/HeaderContainer';

const Layout = ({ title, back = true, counter = false, children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderContainer
        title={counter ? null : title}
        back={back}
        counter={counter}
      />
      {children}
    </>
  );
};

export default Layout;
