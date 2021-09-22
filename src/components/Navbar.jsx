import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../features/auth/authSlice';
import { resetFeed } from '../features/posts/postsSlice';
import { resetProfile } from '../features/profile/profileSlice';
import { Navlinks } from '.';

export const Navbar = () => {
    const { userId } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(logOutUser());
        dispatch(resetFeed());
        dispatch(resetProfile());
    };

    return (
        <Fragment>
            <header className="flex shadow-sm fixed top-0 left-0 w-full bg-white px-4 z-20">
                <div className="flex items-center justify-center md:justify-start h-12 py-2">
                    <NavLink
                        to="/"
                        className="flex items-center text-xl to-blue-500"
                    >
                        {/* <i className="bx bx-wind text-2xl transform -rotate-90 mx-4"></i> */}
                        <span className="hidden md:block">Social Media</span>
                    </NavLink>
                </div>
                {/* <nav className="md:flex justify-between flex-col fixed bottom-2 w-full md:w-72 md:top-0 md:mt-16 p-4"> */}
                <nav className="nav-actions">
                    <div>
                        <div className="bg-white shadow md:shadow-none rounded-xl p-2">
                            <ul className="flex justify-around">
                                <li>
                                    {' '}
                                    <Navlinks
                                        link={'/'}
                                        icon={'home'}
                                        linkName={'Feed'}
                                    />{' '}
                                </li>
                                <li>
                                    {' '}
                                    <Navlinks
                                        link={'/explore'}
                                        icon={'planet'}
                                        linkName={'Explore'}
                                    />{' '}
                                </li>
                                <li>
                                    {' '}
                                    <Navlinks
                                        link={'/notify'}
                                        icon={'bell'}
                                        linkName={'Notifications'}
                                    />{' '}
                                </li>
                                <li>
                                    {' '}
                                    <Navlinks
                                        link={`/profile/${userId}`}
                                        icon={'user'}
                                        linkName={'Profile'}
                                    />{' '}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <button
                    onClick={() => logOutHandler()}
                    className="hidden md:flex items-center bg-white p-3 hover:text-blue rounded-md"
                >
                    <i className="bx bx-log-out text-lg"></i>
                    <span className="text-base whitespace-nowrap ml-4">
                        Log Out
                    </span>
                </button>
            </header>

            {/* <nav className="md:flex justify-between flex-col fixed bottom-2 w-full md:w-72 md:top-0 md:mt-16 p-4">
                <div>
                    <div className="bg-white shadow rounded-xl p-2">
                        <ul className="flex justify-around md:flex-col">
                            <li>
                                {' '}
                                <Navlinks
                                    link={'/'}
                                    icon={'home'}
                                    linkName={'Feed'}
                                />{' '}
                            </li>
                            <li>
                                {' '}
                                <Navlinks
                                    link={'/explore'}
                                    icon={'planet'}
                                    linkName={'Explore'}
                                />{' '}
                            </li>
                            <li>
                                {' '}
                                <Navlinks
                                    link={'/notify'}
                                    icon={'bell'}
                                    linkName={'Notifications'}
                                />{' '}
                            </li>
                            <li>
                                {' '}
                                <Navlinks
                                    link={`/profile/${userId}`}
                                    icon={'user'}
                                    linkName={'Profile'}
                                />{' '}
                            </li>
                        </ul>
                    </div>
                </div>
                <button
                    onClick={() => logOutHandler()}
                    className="hidden shadow md:flex items-center bg-white p-3 hover:text-blue rounded-md"
                >
                    <i className="bx bx-log-out text-lg"></i>
                    <span className="text-base whitespace-nowrap ml-4">
                        Log Out
                    </span>
                </button>
            </nav> */}
        </Fragment>
    );
};
