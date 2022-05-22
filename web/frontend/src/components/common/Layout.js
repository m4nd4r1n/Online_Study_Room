import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderContainer from '../../containers/common/HeaderContainer';

const Layout = ({
  title,
  back = true,
  counter = false,
  children,
  logo = true,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderContainer
        title={counter ? null : title}
        back={back}
        counter={counter}
        logo={logo}
      />
      {children}
    </>
  );
};

export default Layout;
