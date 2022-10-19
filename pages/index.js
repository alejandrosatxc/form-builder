import Head from 'next/head'
import FieldsTray from '../components/FieldsTray'
import FormBuilder from '../components/FormBuilder'
export default function Home() {

  return (
    <div className="grid grid-cols-3 gap-x-6 h-screen place-items-center bg-gray-400">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Created by Alejandro Zapien" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FieldsTray />
      <FormBuilder />

    </div>
  )
}
