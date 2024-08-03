import React, { useEffect } from 'react'

export const AdSenseAd: React.FC = () => {
  useEffect(() => {
    // Certifique-se de que o AdSense já está carregado
    if (window.adsbygoogle && window.adsbygoogle.length > 0) {
      ;(window.adsbygoogle as any).push({})
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4542878322637122"
      data-ad-slot="8986190269"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}
