import Head from 'next/head'
import Image from 'next/Image'
import { useState, useEffect } from 'react'
import styles from '../../styles/images.module.css'

export default function SeeAll() {

  // object of images
  // 'image1': 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f',

  // example of response object
  const one = {
    alt_description : null,
    blur_hash : "LLEooPxu~qa{=|M{%Mt7WTt7Iooz",
    color : "#404026",
    created_at : "2022-09-30T22:06:54Z",
    height : 6433,
    id : "o2hPCfwPPkw",
    liked_by_user : false,
    likes : 123,
    links : {self: 'https://api.unsplash.com/photos/o2hPCfwPPkw', html: 'https://unsplash.com/photos/o2hPCfwPPkw', download: 'https://unsplash.com/photos/o2hPCfwPPkw/download?i…nwzODA0MzF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY2ODQwMjc5NA', download_location: 'https://api.unsplash.com/photos/o2hPCfwPPkw/downlo…nwzODA0MzF8MXwxfGFsbHwxfHx8fHx8Mnx8MTY2ODQwMjc5NA'},
    updated_at : "2022-11-13T16:30:31Z",
    urls : {raw: 'https://images.unsplash.com,/photo-1664575600850-c4…fGFsbHwxfHx8fHx8Mnx8MTY2ODQwMjc5NA&ixlib=rb-4.0.3', full: 'https://images.unsplash.com/photo-1664575600850-c4…HwxfHx8fHx8Mnx8MTY2ODQwMjc5NA&ixlib=rb-4.0.3&q=80', regular: 'https://images.unsplash.com/photo-1664575600850-c4…fHx8Mnx8MTY2ODQwMjc5NA&ixlib=rb-4.0.3&q=80&w=1080', small: 'https://images.unsplash.com/photo-1664575600850-c4…8fHx8Mnx8MTY2ODQwMjc5NA&ixlib=rb-4.0.3&q=80&w=400', thumb: 'https://images.unsplash.com/photo-1664575600850-c4…8fHx8Mnx8MTY2ODQwMjc5NA&ixlib=rb-4.0.3&q=80&w=200', },
    user : {id: 'VKlg9Ffk2GE', updated_at: '2022-11-11T05:10:31Z', username: 'microsoft365', name: 'Microsoft 365', first_name: 'Microsoft', },
    width : 4289,
  }

  const [images, setImages] = useState([])
  console.log(typeof images);
  let pageNumber = 1
  const perPage = 6
  const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID

  // fetch images from unsplash
  const fetchImages = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/?client_id=${clientId}&page=${pageNumber}&per_page=${perPage}`)
    const data = await response.json()
    console.log('fetching', `https://api.unsplash.com/photos/?client_id=${clientId}&page=${pageNumber}&per_page=${perPage}`, data)
    // console.log('images before', images);
    setImages([...images, data])
    // console.log('images after', images);
    pageNumber += 1;
    return data
  }

  useEffect(() => {
  }, [])
  
  return (
    <div className="container-fluid">
      <Head>
        <title>All Images - Cires Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className={`row`}>
      </nav>

      <div >
        {/* button to fetch images */}
        <button onClick={fetchImages}>Fetch Images</button>
      </div>

      <main className={`row gap-4 justify-content-center image-container`}>
        {/* loop on images object and display them with hover heart effect */}
        {Object.keys(images).map((index) => {
          console.log(images[index])
          // console.log('logging', index, image)
          return
          (
            <div className={`position-relative rounded image`} key={index}
              style={{width: '20rem', height:'17rem',}}>
              <Image src={images[index].urls.raw} fill objectFit='cover' className='rounded' />
            </div>)
          })}
      </main>
    </div>
  )
}
