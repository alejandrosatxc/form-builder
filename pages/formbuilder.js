import { useRouter } from 'next/router'
import FormComponentsTray from '../components/FormComponentsTray'
import FormBuilder from '../components/FormBuilder'
export default function FormBuilderInterface() {

  const router = useRouter()
  let GdocData = null
  //Check if router.query is empty object, which means no query
  if (Object.keys(router.query).length !== 0) {
    GdocData = router.query
    console.log(GdocData)
  }

  return (
    <div className="flex flex-col h-auto">
      {/* <div className="flex place-items-center justify-center w-full h-16 bg-red-400 border-red-500 border-2">This is currently being designed and worked on, not final, check Components tab for visual updates</div> */}
      <div className="flex flex-row">
        <FormComponentsTray />
        <FormBuilder GdocData={GdocData} />
      </div>

    </div>
  )
}
