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
      <div className="absolute left-0 right-0 -z-50 flex h-60 bg-[url('../public/background/kwu.jpg')] opacity-30 blur-sm"></div>
      {children}
    </>
  );
};

export default Layout;
