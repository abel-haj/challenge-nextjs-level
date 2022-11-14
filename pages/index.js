import Head from 'next/head'
import Image from 'next/image'
import womanImage from '../public/images/woman.png'
import { useState } from 'react'

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
        <title>Login - Cires Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="row">
          {/* RIGHT SECTION */}
          <div className='col-lg-6'>
            {/* center form vertically */}
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
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

          {/* LEFT SECTION */}
          <div className='col-lg-6'>
            <div className='d-flex flex-column justify-content-center align-items-center position-relative clearfix' style={{ height: '100vh' }}>
              <Image src={womanImage} style={{width:'100%', height:'auto'}} />
              {/* float quote above the image at the bottom */}
              <div className='position-absolute bottom-0 start-50 translate-middle-x'>
                <div className='bg-white mx-2 my-4'
                  // style={{ filter:'blur(1px)' }}
                  >
                  <p className='text-muted'>
                    "I love the way you work. It's so easy to use and it's so fast. I'm so happy with my website."
                  </p>
                  <p className='text-muted'>
                    <b>John Doe</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}