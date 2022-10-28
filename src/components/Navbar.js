import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token, user }) => {
    console.log()
    return (

        <header id="navbar">
            <nav id="navBack">
                {
                    token ? (
                        <ul id="navList">
                            <li id="welcome">
                            Welcome {`${user.username}!`}
                            </li>
                            <li>
                            <Link id="home" to='/'>Home</Link>
                            </li>
                            <li>
                            <Link id="profile" to='/profile'>Profile</Link>
                            </li>
                            <li>
                            <Link id="logout" to='/' onClick={() => logout()}>Logout</Link>
                            </li>
                        </ul>
                    ) : (
                        <>
                            <Link id="home" to='/'>Home</Link>
                            <Link id="posts" to='/posts'>Posts</Link>
                            <Link id="register" to='/register'>Register</Link>
                            <Link id="login" to='/login'>Login</Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar;