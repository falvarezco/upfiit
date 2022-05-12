import { Formik, Form, Field } from 'formik';
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
  const initialForm = {
    preparation: 0,
    work: 0,
    restBetweenCycles: 0,
    cycles: 0,
    sets: 0,
    restBetweenSets: 0,
    coolDown: 0,
  }
  const handleSubmit = (values, setSubmitting) => console.log(values);
  const onHandleCardUpdate = (type: string) => console.log(type)
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
      {/* <Formik initialValues={initialForm} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form>
            <div className='w-100 flex flex-col items-center p-20 mb-10 dark:bg-slate-800 rounded'>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Preparation (Seconds):</label>
                <Field type="number" min="0" id="preparation" name="preparation" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Work (Seconds):</label>
                <Field type="number" min="1" value="1" id="work" name="work" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Rest Between Cycles (Seconds):</label>
                <Field type="number" min="0" id="restBetweenCycles" name="restBetweenCycles" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Cycles:</label>
                <Field type="number" min="0" id="cycles" name="cycles" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Sets:</label>
                <Field type="number" min="1" value="1" id="sets" name="sets" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Rest Between Sets (Seconds):</label>
                <Field type="number" min="0" id="restBetweenSets" name="restBetweenSets" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Cool Down (Seconds):</label>
                <Field type="number" min="0" id="coolDown" name="coolDown" />
              </div>
              <button className='text-white rounded hover:bg-emerald-700 bg-emerald-500 p-5 transition ease-in-out delay-50 cursor-pointer' type="submit" disabled={isSubmitting}>
                Start Tabata!
              </button>
            </div>
          </Form>
        )}
      </Formik> */}
    </div>
  )
}

export default Config;