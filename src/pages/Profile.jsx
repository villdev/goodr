import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getUserProfile } from '../features/profile/request';
import { UserPostCard, ProfileHeader, Loader } from '../components';

export default function Profile() {
    const { profile, profilePosts, profileStatus } = useSelector(
        (state) => state.profile
    );
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { profileId } = useParams();

    useEffect(() => {
        // fetch other profile
        if (profileId !== profile?._id && status === 'profileLoaded') {
            dispatch(getUserProfile(profileId));
        }

        if (profileId === profile?._id && status === 'idle') {
            dispatch(getUserProfile(profileId));
        }
    }, [dispatch, status, profileId, profile?._id]);

    return (
        <Fragment>
            {profileStatus === 'loading' && <Loader />}
            {profileStatus === 'dataReceived' && profile && (
                <div>
                    <ProfileHeader
                        profile={profile}
                        profilePosts={profilePosts}
                    />
                    {profilePosts?.length === 0 && (
                        <div className="text-center mt-5">No posts.</div>
                    )}
                    {profilePosts?.map((post) => (
                        <UserPostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </Fragment>
    );
}
