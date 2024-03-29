import Head from 'next/head'
import { useRouter } from 'next/router'
import { use } from 'react'
import FieldsTray from '../components/FieldsTray'
import FormBuilder from '../components/FormBuilder'
export default function Home() {

  const router = useRouter()
  let GdocData = null
  //Check if router.query is empty object, which means no query
  if (Object.keys(router.query).length !== 0) {
    GdocData = router.query
    console.log(GdocData)
  }

  return (
    <div className="flex flex-col h-auto">
      <Head>
        <title>Form Builder ✨🦆</title>
        <meta name="description" content="Created by Alejandro Zapien" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex place-items-center justify-center w-full h-16 bg-red-400 border-red-500 border-2">This is currently being designed and worked on, not final, check Components tab for visual updates</div>
      <div className="flex flex-row">
        <FieldsTray className="" />
        <FormBuilder GdocData={GdocData} />
      </div>

    </div>
  )
}
