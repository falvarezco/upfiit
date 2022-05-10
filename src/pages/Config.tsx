import { Formik, Form, Field } from 'formik';

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
  return (
    <div className='flex items-center flex-col'>
      <div className="m-10 flex flex-col items-center">
        <h1 className='text-white text-bold'>Welcome To TabataX!</h1>
        <h4 className='text-white'>Create your custom Tabata timer below</h4>
      </div>
      <Formik initialValues={initialForm} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form>
            <div className='w-100 flex flex-col items-center p-20 mb-10 bg-gray-900 rounded'>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Preparation (Seconds):</label>
                <Field type="number" id="preparation" name="preparation" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Work (Seconds):</label>
                <Field type="number" id="work" name="work" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Rest Between Cycles (Seconds):</label>
                <Field type="number" id="restBetweenCycles" name="restBetweenCycles" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Cycles:</label>
                <Field type="number" id="cycles" name="cycles" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Sets:</label>
                <Field type="number" id="sets" name="sets" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Rest Between Sets (Seconds):</label>
                <Field type="number" id="restBetweenSets" name="restBetweenSets" />
              </div>
              <div className="flex m-10 items-start">
                <label className="text-white pr-5" htmlFor="preparation">Cool Down (Seconds):</label>
                <Field type="number" id="coolDown" name="coolDown" />
              </div>
              <button className='text-white rounded hover:bg-emerald-700 bg-emerald-500 p-5 transition ease-in-out delay-50 cursor-pointer' type="submit" disabled={isSubmitting}>
                Start Tabata!
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Config;