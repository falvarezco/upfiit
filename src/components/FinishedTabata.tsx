import React, { FC, ReactNode } from 'react';

interface FinishedTabataProps {
  children: ReactNode;
}

const FinishedTabata: FC<FinishedTabataProps> = ({children}) => (
  <div>
    <h1 className='text-white text-center'>{`Tabata Completed! :)`}</h1>
    {children}
  </div>
)

export default FinishedTabata;