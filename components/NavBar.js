import Link from 'next/link'
import logo from '../public/travel-blog-logo.jpg'
const NavBar = () => {
    return (
        <nav className='nav-container'>
            <div className='nav-item-container' id='nav-image-home'>
                <Link href='/'>
                    <img 
                        className='nav-bar-image'
                        src={urlFor(logo)}
                        alt='Travel Blog Logo'
                    />
                </Link>
                <small><a href='https://www.freepik.com/vectors/explore'>Image from <strong>pch.vector</strong></a></small>
            </div>
            <div className='nav-item-container' id='credits'>
                <p>A Blog by <strong>Christopher J. Conley</strong></p>
            </div>
        </nav>
    )
}

export default NavBar