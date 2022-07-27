import React, { FC } from 'react';
import {lowerCase, capitalize} from 'lodash';
import Icon from './Icon';
import { WORK } from '../store/tabata';

interface WorkIntervalProps {
  name: string,
  time: number,
}

const WorkInterval: FC<WorkIntervalProps> = ({name, time}) => {
  const isWorkingCy = name === WORK;
  const cyClasses = `
    flex-1 align-items-center w-full p-10 bg-slate-800 border
    rounded ${isWorkingCy ? 'border-teal-300' : 'border-slate-600'}
  `;
  return (
    <div className={cyClasses}>
      <header className='flex justify-center'>
        <Icon iconName={name} classes='h-7x w-7 stroke-teal-300'/>
        <h1 className='text-teal-300 px-2 text-2xl'>{capitalize(lowerCase(name))}:</h1>
      </header>
      <h1 className='text-center pt-5 text-white px-2 text-8xl'>{time}</h1>
    </div>
  )
}

export default WorkInterval;