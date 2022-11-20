import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/login.module.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // handle login errors
  const [error, setError] = useState('')
  // handle loading
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    // check if user is logged in
    const user = localStorage.getItem('user')

    // if logged in
    // redirect to images page
    if (user) {
      Router.push('/images')
      return
    }

    // finished loading
    setPageLoading(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // send request to log user in
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    // await response
    const data = await res.json()

    // if error found
    if (data.error) {
      // display it
      setError(data.message)
    } else {
      // else empty the error
      setError('')
      // and save user
      localStorage.setItem('user', JSON.stringify(data.user))
      // then redirect to images page
      Router.push('/images')
    }
    // finish loading
    setLoading(false)
  }

  // loading while checking if user is logged in
  if (pageLoading) {
    return (<div>Loading...</div>)
  }
  return (
    <div className="container-fluid">
      <Head>
        <meta charSet="UTF-8" />
        <title>Login - Cires Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content='white' />
      </Head>

      <main>
        <div className="row">
          {/* LEFT SECTION */}
          <div className='col-12 col-md-6'>
            <div className={`d-flex justify-content-center align-items-center ${styles.vh100}`}>
              {/* handle loading */}
              <form className='row col-lg-8' onSubmit={handleSubmit}>
                <div className='col-lg-12'>
                  <h1 className=''>Welcome back</h1>
                  <p className='text-muted'>Welcome back! Please enter your details</p>
                </div>

                {/* output error if exists */}
                {error && <div className='col-lg-12'>
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>}

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="usernameInput">Username</label>
                  <input type="text" name="username" id="usernameInput"
                    className="form-control" placeholder="Enter username"
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="passwordInput">Password</label>
                  <input type="password" name="password" id="passwordInput"
                    className="form-control" placeholder='Enter your password'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group d-flex justify-content-between mb-3">
                  <div className="d-inline-block">
                    <input className="form-check-input me-2" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me for 30 days</label>
                  </div>

                  <div className="d-inline-block">
                    <strong>
                      <a className='text-black text-decoration-none' href="#">Forgot password</a>
                    </strong>
                  </div>
                </div>

                {/* full width button sign in button */}
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-dark w-100">
                    {loading ? 'Loading...' : 'Sign in'}
                  </button>
                </div>

                {/* full width button sign in with google button */}
                <div className="form-group mb-3">
                  <button type="button" className="btn btn-outline-dark w-100">
                    <Image src="https://img.icons8.com/color/24/000000/google-logo.png" alt='google logo'
                      width={24} height={24} className='mx-2' />
                    Sign in with Google
                  </button>
                </div>

                <div className="form-group mb-3">
                  <p className='text-center'>
                    Don't have an account? <b><a className='text-black text-decoration-none' href="#">Sign up for free</a></b>
                  </p>
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className='d-none d-md-block col-md-6'>
            <div
              className={`d-flex flex-column justify-content-center align-items-center position-relative clearfix ${styles.imageBackground} ${styles.vh100}`}>

              <div
                className='position-absolute bottom-0 start-50 translate-middle-x w-100'
              >
                <div className={`m-4 px-3 py-4 text-white rounded ${styles.backgroundOverlay}`}>
                  <blockquote className='h4 mb-3'>
                    "We've been using Untitled to kick start every new project and can't imagin working without it."
                  </blockquote>

                  <div className='d-flex justify-content-between mb-2'>
                    <h2>Andi Lane</h2>

                    <div className=''>
                      <Image width={14} height={14} className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" alt='star' />
                      <Image width={14} height={14} className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" alt='star' />
                      <Image width={14} height={14} className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" alt='star' />
                      <Image width={14} height={14} className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" alt='star' />
                      <Image width={14} height={14} className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" alt='star' />
                    </div>
                  </div>

                  <div className='d-flex justify-content-between'>
                    <div>
                      <small className='text-small'> Founder, Catalog </small><br />
                      <small className='text-small opacity-75'>Web Design Agency</small>
                    </div>

                    <div className='d-flex gap-md-3'>
                      <a href="#" className='w-50 border border-white rounded-circle p-3 m-1' name='previous quote'>
                        <Image width={24} height={24} src="https://img.icons8.com/windows/24/FFFFFF/left.png" alt='left arrow' /></a>
                      <a href="#" className='w-50 border border-white rounded-circle p-3 m-1' name='next quote'>
                        <Image width={24} height={24} src="https://img.icons8.com/windows/24/FFFFFF/right.png" alt='right arrow' /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}