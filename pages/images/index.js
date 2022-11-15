import Head from 'next/head'
import Image from 'next/Image'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Header from '../../components/header'
import styles from '../../styles/images.module.css'

export default function SeeAll() {

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
  const [pageNumber, setPageNumber] = useState(278)
  const [hasMore, setHasMore] = useState(true)
  const [likedImages, setLikedImages] = useState([])
  const perPage = 20
  const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID

  // fetch images from unsplash
  const fetchImages = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/?client_id=${clientId}&page=${pageNumber}&per_page=${perPage}`)
    const data = await response.json()
    console.log(data)

    // if no more images or an error has occuered
    if (data.errors || data.length < perPage) {
      data.errors?.forEach(element => {
        alert(element)
      })
      setHasMore(false)
      return
    }

    setImages([...images, ...data])
    setPageNumber(pageNumber + 1)
  }

  useEffect(() => {
    fetchImages()
  }, [])
  
  return (
    <div id="containerFluid" className="container-fluid">
      <Head>
        <title>All Images - Cires Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main className={``}>
          <InfiniteScroll
            className={`row mx-2 gap-4 justify-content-center image-container`}
            prefill={true}
            dataLength={images.length}
            next={fetchImages}
            hasMore={hasMore}
            loader={
              <div className="my-4 text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
            endMessage={
              <div className={`my-4 text-center`}>
                <h3>Whoops! Looks like there are no more images to see!</h3>
              </div>
            }
          >
            {Object.keys(images).map((index) => {
              return (
                <div className={`position-relative rounded ${styles.image}`}
                  key={index}>

                  <Image src={images[index].urls.regular} fill objectFit='cover' 
                    className='rounded' sizes='25rem'
                    alt={images[index].alt_description || index} 
                  />

                  <div className={`position-absolute bottom-0 start-0 end-0 p-2 bg-light rounded-bottom`}>
                    <div className={`d-flex align-items-center justify-content-between`}>
                      <div className={`text-nowrap ${styles.textEllipsis}`}>
                        <Image
                          className='rounded-circle'
                          src={images[index].user.profile_image.small}
                          width={24} height={24} />
                        {` `}
                        <b>{images[index].user.name}</b>
                      </div>

                      <a
                        onClick={() => {
                          // add image to likedImages or remove it
                          if (likedImages.includes(images[index].id))
                            setLikedImages(likedImages.filter((image) => image !== images[index].id))
                          else
                            setLikedImages([...likedImages, images[index].id])
                        }}
                        className={`text-nowrap ${likedImages.includes(images[index].id) ? 'text-danger' : 'text-muted'} ${styles.clickable} ${styles.zoomHover}`}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class={`bi bi-suit-heart-fill `} viewBox="0 0 16 16">
                          <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                        </svg>
                        {` `}
                        <b>{ likedImages.includes(images[index].id) ? images[index].likes+1 : images[index].likes}</b>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </InfiniteScroll>
      </main>
    </div>
  )
}
