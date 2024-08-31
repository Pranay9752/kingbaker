import React from 'react';
import { Outlet } from 'react-router-dom';
import withCountry from '../HOC/withCountry';

const CountryWrapper = () => {
    
  return (
    <>
      <Outlet />
    </>
  );
};

export default withCountry(CountryWrapper);
