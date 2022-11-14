import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <div className="container-fluid">
      <Head>
        <meta charSet="UTF-8" />
        <title>Login - Cires Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="row">
          {/* LEFT SECTION */}
          <div className='col-12 col-md-6'>
            <div className={`d-flex justify-content-center align-items-center ${styles.vh100}`}>
              <form className='row col-lg-8' onSubmit={handleSubmit}>
                <div className='col-lg-12'>
                  <h1 className=''>Welcome back</h1>
                  <p className='text-muted'>Welcome back! Please enter your details</p>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="emailInput">Email</label>
                  <input type="email" className="form-control" id="emailInput" placeholder="Enter email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="passwordInput">Password</label>
                  <input type="text" id="passwordInput" className="form-control" placeholder='Enter your password'
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
                  <button type="submit" className="btn btn-dark w-100">Sign in</button>
                </div>

                {/* full width button sign in with google button */}
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-outline-dark w-100">
                    <img src="https://img.icons8.com/color/24/000000/google-logo.png"
                      className='mx-2'/>
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
                        <img className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" />
                        <img className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" />
                        <img className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" />
                        <img className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" />
                        <img className={`${styles.m015}`} src="https://img.icons8.com/ios-filled/14/FFFFFF/christmas-star.png" />
                    </div>
                  </div>

                  <div className='d-flex justify-content-between'>
                    <div>
                      <small className='text-small'> Founder, Catalog </small><br/>
                      <small className='text-small opacity-75'>Web Design Agency</small>
                    </div>

                    <div className='d-flex gap-md-3'>
                      <a href="#" className='w-50 border border-white rounded-circle p-3 m-1'>
                        <img src="https://img.icons8.com/windows/24/FFFFFF/left.png" /></a>
                      <a href="#" className='w-50 border border-white rounded-circle p-3 m-1'>
                        <img src="https://img.icons8.com/windows/24/FFFFFF/right.png" /></a>
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