import Head from 'next/head'
import FieldsTray from '../components/FieldsTray'
import FormBuilder from '../components/FormBuilder'
export default function Home() {

  return (
    <div className="grid grid-cols-3 gap-x-6 h-auto bg-gray-400 p-6">
      <Head>
        <title>Form Builder ✨🦆</title>
        <meta name="description" content="Created by Alejandro Zapien" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FieldsTray className=""/>
      <FormBuilder />

    </div>
  )
}
