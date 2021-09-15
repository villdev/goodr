import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../features/profile/request';
import { ProfileCard } from '../components';

export default function Followers() {
    const dispatch = useDispatch();
    const { profile, profileStatus } = useSelector((state) => state.profile);
    const { userId, status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (profileStatus === 'idle' && status === 'profileLoaded') {
            dispatch(getUserProfile(userId));
        }
        // eslint-disable-next-line
    }, [status, userId]);

    return (
        <div>
            <div className="rounded-md bg-white shadow py-2 px-4 mb-4 text-2xl text-gray-600">
                Followers <span>{profile?.followers?.length}</span>
            </div>
            {profile?.followers?.length === 0 && (
                <div className="text-center">You have no followers.</div>
            )}
            {profile?.followers?.map((profile) => (
                <ProfileCard key={profile._id} profile={profile} />
            ))}
        </div>
    );
}
