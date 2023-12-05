import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode,
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className='flex h-full items-center h-inherit flex-col'>
      <Header />
      <div className='flex w-full h-full items-center h-inherit flex-col'>
        {children}
      </div>
    </div>
  );
}


export default Layout;