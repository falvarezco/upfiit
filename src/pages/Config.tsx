import ConfigCard from '../components/ConfigCard';

interface ConfigCardData {
  title: string,
  icon: string,
  description: string,
}

const CARDS: ConfigCardData[] = [
  {
    title: 'preparation',
    icon: 'clock',
    description: 'Time interval before jumping into action',
  },
  {
    title: 'work',
    icon: 'fire',
    description: 'Time for each excercise block',
  },
  {
    title: 'excercises',
    icon: 'lightning',
    description: 'Number of Excercises in Set',
  },
  {
    title: 'rest',
    icon: 'hand',
    description: 'Rest time between excercises',
  },
  {
    title: 'sets',
    icon: 'refresh',
    description: 'A set is a group of excercises + Rest times',
  },
  {
    title: 'rest in sets',
    icon: 'hand',
    description: 'Rest time between Sets',
  }
]

const Config = () => {

  const onHandleCardUpdate = (value: string) => console.log(value)
  return (
    <div className='flex items-center h-inherit flex-col'>
      <header className="w-full dark:bg-slate-800 h-40 flex items-center justify-center">
        <div className='flex flex-col items-center'>
          <h1 className='text-white text-bold text-2xl mb-3'>Tabata X</h1>
          <h4 className='text-white'>Create a Tabata timer and reach your goals! <a className='text-teal-300 cursor-pointer hover:underline'>Learn how it works here.</a></h4>
        </div>
      </header>
      <div className='m-20 w-9/12 grid grid-cols-3 gap-3'>
        {CARDS.map(card => <ConfigCard {...card} onUpdate={onHandleCardUpdate}/>)}
      </div>
      <button className='px-10 py-5 mb-20 bg-teal-300 hover:bg-teal-400 text-slate-900 rounded select-none text-bold transition ease-in-out delay-50 cursor-pointer'>Start Tabata</button>
    </div>
  )
}

export default Config;