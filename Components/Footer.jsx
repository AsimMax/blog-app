import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
const Footer = () => {
  return (
   <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 bg-black py-4 sm:py-5 px-4">
  <Image
    src={assets.logo_light}
    alt="logo"
    width={120}
    className="w-24 sm:w-32"
  />

  <p className="text-xs sm:text-sm text-white text-center">
    All rights reserved. © Blogger
  </p>

  <div className="flex gap-3">
    <Image src={assets.facebook_icon} alt="facebook" width={32} />
    <Image src={assets.twitter_icon} alt="twitter" width={32} />
    <Image src={assets.googleplus_icon} alt="googleplus" width={32} />
  </div>
</div>

  )
}

export default Footer
