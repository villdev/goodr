import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatus } from '../features/auth/authSlice';
import { signupUserWithCredentials } from '../features/auth/request';

export default function SignUp() {
    const { status, isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [newUserInfo, setNewUserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const validate = () => {
        if (
            !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(newUserInfo.email)
        ) {
            setErrorMessage('Invalid Email address!');
            return false;
        }
        if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(
                newUserInfo.password
            )
        ) {
            setErrorMessage(
                'Must be atleast 8 characters long and contain 1 uppercase, lowercase letter and number.'
            );
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const signUpCredHandler = (e) => {
        const value = e.target.value;
        setNewUserInfo({
            ...newUserInfo,
            [e.target.name]: value
        });
    };

    const signupHandler = () => {
        validate() && dispatch(signupUserWithCredentials(newUserInfo));
    };

    useEffect(() => {
        dispatch(resetStatus());
        isAuthenticated && navigate('/');
        // eslint-disable-next-line
    }, [isAuthenticated, navigate]);

    const bgStyle = {
        backgroundImage: `url(${'https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    return (
        <div className="flex items-center bg-gray-50">
            <div className="flex bg-white m-auto shadow-xl rounded-md overflow-hidden">
                <div
                    className="hidden md:w-96 p-10 md:block"
                    style={bgStyle}
                ></div>
                <div className="py-4 px-4 w-screen md:w-96">
                    <h1 className="font-light text-4xl mt-3 text-center">
                        Create Account
                    </h1>
                    <form className="mt-6">
                        <div className="my-5 text-sm">
                            <label htmlFor="name" className="block text-black">
                                Name
                            </label>
                            <input
                                onChange={(e) => signUpCredHandler(e)}
                                type="text"
                                autoFocus
                                name="name"
                                className="rounded px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Name"
                            />
                        </div>
                        <div className="my-5 text-sm">
                            <label
                                htmlFor="username"
                                className="block text-black"
                            >
                                Username
                            </label>
                            <input
                                onChange={(e) => signUpCredHandler(e)}
                                type="text"
                                name="username"
                                className="rounded px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Username"
                            />
                        </div>
                        <div className="my-5 text-sm">
                            <label htmlFor="email" className="block text-black">
                                Email
                            </label>
                            <input
                                onChange={(e) => signUpCredHandler(e)}
                                type="email"
                                name="email"
                                className="rounded px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Email"
                            />
                        </div>
                        <div className="my-5 text-sm">
                            <label
                                htmlFor="password"
                                className="block text-black"
                            >
                                Password
                            </label>
                            <input
                                onChange={(e) => signUpCredHandler(e)}
                                type="password"
                                name="password"
                                className="rounded px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                                required={true}
                                placeholder="Password"
                            />
                        </div>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                signupHandler();
                            }}
                            className={`block text-center text-white bg-gray-800 p-3 duration-300 rounded "hover:bg-black" w-full`}
                        >
                            {status === 'loading' ? (
                                <span>
                                    Creating account{' '}
                                    <i className="bx bx-loader-alt animate-spin"></i>
                                </span>
                            ) : (
                                'Signup'
                            )}
                        </button>
                        {errorMessage !== '' && (
                            <div className="bg-red-50 p-2 mt-4 rounded">
                                <span className="text-xs font-medium text-red-600">
                                    Must be at least 8 characters long and
                                    contain 1 uppercase, lowercase letter and
                                    number.
                                </span>
                            </div>
                        )}
                    </form>
                    <p className="mt-4 text-sm text-center font-normal text-gray-900">
                        {' '}
                        Already have an account?{' '}
                        <Link to="/login" className="text-black font-medium">
                            {' '}
                            Log In{' '}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
