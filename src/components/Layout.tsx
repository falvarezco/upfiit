import { FC, ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode,
}

const Layout: FC<LayoutProps> = ({children}): JSX.Element => (
  <div className='flex items-center h-inherit flex-col'>
    <Header />
    <div className='flex items-center h-inherit flex-col'>
      {children}
    </div>
  </div>
)

export default Layout;