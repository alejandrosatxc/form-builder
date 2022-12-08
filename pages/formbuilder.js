import Head from 'next/head'
import { useRouter } from 'next/router'
import { use } from 'react'
import FieldsTray from '../components/FieldsTray'
import FormBuilder from '../components/FormBuilder'
export default function Home() {

  const router = useRouter()
  let formFields = { matches: [], uniqueMatches: []}
  if(router.query) {
    formFields = router.query
    //console.log(formFields)
  }

  return (
    <div className="flex flex-row h-auto">
      <Head>
        <title>Form Builder ✨🦆</title>
        <meta name="description" content="Created by Alejandro Zapien" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FieldsTray className=""/>
      <FormBuilder formFields={formFields}/>

    </div>
  )
}
