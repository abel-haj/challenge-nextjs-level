import Head from 'next/head'
import Image from 'next/Image'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Header from '../../components/header'
import styles from '../../styles/images.module.css'

export default function SeeAll() {

  const [images, setImages] = useState([])
  const [pageNumber, setPageNumber] = useState(278)
  const [hasMore, setHasMore] = useState(true)
  const [likedImages, setLikedImages] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [user, setUser] = useState({})
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

  const handleLike = async (image) => {
    const result = await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ image: image, username: user.username }),
    })

    const data = await result.json()

    if (data.success) {
      setLikedImages([...likedImages, image])
    }
  }
  const handleUnlike = async (image) => {
    const result = await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ image, username: user.username }),
    })

    const data = await result.json()

    if (data.success) {
      setLikedImages(likedImages.filter(img => img.id !== image.id))
    }
  }

  useEffect(() => {
    // // check if user is logged in
    let usr = (localStorage.getItem('user'))

    if (!usr) {
      Router.push('/')
      return
    }

    else {
      usr = JSON.parse(usr)
      setLikedImages(usr.images)
      setUser(usr)
      setPageLoading(false)
    }

    fetchImages()
  }, [])

  if (!clientId)
    return (<div>You need to specify an Api key in .env file for this page to work</div>)

  // while checking if user is logged in
  if (pageLoading)
    return (<div>Loading...</div>)

  return (
    <div id="containerFluid" className="container-fluid">
      <Head>
        <title>All Images - Cires Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content='white' />
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
                          handleUnlike(images[index].id)
                        else
                          handleLike(images[index].id)
                      }}
                      className={`text-nowrap ${likedImages.includes(images[index].id) ? 'text-danger' : 'text-muted'} ${styles.clickable} ${styles.zoomHover}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-suit-heart-fill `} viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                      </svg>
                      {` `}
                      <b>{likedImages.includes(images[index].id) ? images[index].likes + 1 : images[index].likes}</b>
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
