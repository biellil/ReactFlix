import React, { useEffect } from 'react'
import { Ins } from './styles'

export const AdSenseAd: React.FC = () => {
  useEffect(() => {
    // Adiciona o primeiro script
    const firstScript = document.createElement('script')
    firstScript.src = 'https://rndhaunteran.com/400/7902167'
    firstScript.async = true
    document.body.appendChild(firstScript)

    // Adiciona o segundo script
    const secondScript = document.createElement('script')
    secondScript.src = 'https://atshroomisha.com/act/files/tag.min.js?z=7902143'
    secondScript.setAttribute('data-cfasync', 'false')
    secondScript.async = true
    document.body.appendChild(secondScript)

    // Adiciona o terceiro script
    const thirdScript = document.createElement('script')
    thirdScript.text = `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('loajawun.com',7902167,document.createElement('script'))`
    document.body.appendChild(thirdScript)

    // Cleanup para remover os scripts ao desmontar o componente
    return () => {
      document.body.removeChild(firstScript)
      document.body.removeChild(secondScript)
      document.body.removeChild(thirdScript)
    }
  }, [])

  return (
    <Ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4542878322637122"
      data-ad-slot="8986190269"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></Ins>
  )
}

// export const VerticalAd: React.FC = () => {
//   return (
//     <>
//       <VerticaIns
//         className="adsbygoogle"
//         style={{ display: 'block', background: 'red' }}
//         data-ad-client="ca-pub-4542878322637122"
//         data-ad-slot="5252002964"
//         data-ad-format="auto"
//         data-adtest="on"
//         data-full-width-responsive="true"
//       ></VerticaIns>
//     </>
//   )
// }
