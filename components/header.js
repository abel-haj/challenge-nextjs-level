import styles from '../styles/images.module.css'

export default function Header () {
  return (
    <header className={`row pt-3 pb-2 mb-3 justify-content-between text-muted`}>
      {/* Title */}
      <div className="col-12 col-lg-4 text-uppercase text-center">
        <span className="display-6">All Images</span>
      </div>

      {/* middle links */}
      <nav className="col-12 col-lg-4 d-flex justify-content-center flex-wrap my-2">
        <a href="#" className={`p-2 link-secondary text-nowrap ${styles.selected}`}  >All</a>
        <a href="#" className="p-2 link-secondary text-nowrap">Animation</a>
        <a href="#" className="p-2 link-secondary text-nowrap">Branding</a>
        <a href="#" className="p-2 link-secondary text-nowrap">Illustration</a>
      </nav>

      {/* logout button */}
      <div className="col-12 col-lg-4 d-flex justify-content-center">
        <button className="btn btn-outline-secondary">Logout</button>
      </div>
    </header>
  )
}