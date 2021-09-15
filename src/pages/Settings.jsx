import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ProfileUpdate, Account } from '../components';
import {
    getUserProfile,
    updateUserPassword
} from '../features/profile/request';

export default function Settings() {
    const dispatch = useDispatch();
    const { profile, profileStatus } = useSelector((state) => state.profile);
    const { userId, status } = useSelector((state) => state.auth);
    const [passwordUpdate, setPasswordUpdate] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (profileStatus === 'idle' && status === 'profileLoaded') {
            dispatch(getUserProfile(userId));
        }
        // eslint-disable-next-line
    }, [status, userId]);

    // password
    const passwordUpdateInputs = (e) => {
        const value = e.target.value;
        setPasswordUpdate({
            ...passwordUpdate,
            [e.target.name]: value
        });
    };
    const updatePassword = () => {
        dispatch(updateUserPassword(passwordUpdate));
    };

    return (
        <div className="p-2">
            <button
                className="flex items-center text-blue-600 font-medium"
                onClick={() => navigate(-1)}
            >
                <i className="bx bx-chevron-left text-2xl"></i> Back
            </button>
            <ProfileUpdate profile={profile} profileStatus={profileStatus} />
            <Account
                passwordUpdateInputs={passwordUpdateInputs}
                updatePassword={updatePassword}
                profileStatus={profileStatus}
            />
        </div>
    );
}
