import React, { FC, ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode,
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className='flex items-center h-inherit flex-col'>
      <Header />
      <div className='flex w-full items-center h-inherit flex-col'>
        {children}
      </div>
    </div>
  );
}


export default Layout;