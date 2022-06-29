import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/travel-blog-logo.jpg'
const NavBar = () => {
    return (
        <nav className='nav-container'>
            <div className='nav-item-container' id='nav-image-home'>
                <Link href='/'>
                    <Image 
                        className='nav-bar-image'
                        src={logo}
                        alt='Travel Blog Logo'
                    />
                </Link>
            </div>
            <div className='nav-item-container' id='nav-image-src-link'>
                <small><a href='https://www.freepik.com/vectors/explore'>Image from <strong>pch.vector</strong></a></small>
            </div>
            <div className='nav-item-container' id='credits'>
                <p>A Blog by <strong>Christopher J. Conley</strong></p>
            </div>
        </nav>
    )
}

export default NavBar