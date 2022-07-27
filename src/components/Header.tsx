import React, { FC } from 'react';

const Header: FC = (): JSX.Element => (
  <header className="w-full dark:bg-slate-800 h-20 flex items-center justify-center">
    <div className='flex flex-col items-center'>
      <h1 className='text-white text-bold text-2xl'>Tabata X</h1>
    </div>
  </header>
)

export default Header;