import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
    <img src="favicon.ico" alt="logo" width="30" height="24"/>
      <span>Data Visualization Dashboard</span>
    </Link>
    </div>
</nav>
  )
}

export default Navbar