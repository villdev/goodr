import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOutUser } from '../features/auth/authSlice';
import { resetFeed } from '../features/posts/postsSlice';
import { resetProfile } from '../features/profile/profileSlice';
import { followUser, unFollowUser } from '../features/auth/request';
import { InitialDP, alreadyExist } from '.';

export const ProfileHeader = ({ profile, profilePosts }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isFollowing = alreadyExist(user?.following, profile._id);

    const logOutHandler = () => {
        dispatch(logOutUser());
        dispatch(resetFeed());
        dispatch(resetProfile());
    };

    return (
        <div className="rounded-md bg-white py-2 px-4 text-center sm:text-left">
            <div className=" flex items-center flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                    <div className="my-2">
                        {profile?.profilePhoto ? (
                            <img
                                className="w-28 h-auto rounded-md"
                                src={profile?.profilePhoto}
                                alt={profile?.name}
                            />
                        ) : (
                            <InitialDP
                                name={profile?.name}
                                size={28}
                                fontSize={'text-4xl'}
                            />
                        )}
                    </div>
                    <div className="sm:ml-12">
                        <h4 className="text-lg font-semibold">
                            {profile?.name}
                        </h4>
                        <span className="text-sm text-gray-400 font-normal">
                            @{profile?.username}
                        </span>

                        <div className="flex my-2">
                            <div className="font-semibold">
                                {profilePosts?.length || 0}
                                <span className="text-gray-400 text-sm ml-1">
                                    posts
                                </span>
                            </div>
                            <Link to="followers">
                                <div className="font-semibold ml-6">
                                    {profile?.followers?.length}
                                    <span className="text-gray-400 text-sm ml-1">
                                        Followers
                                    </span>
                                </div>
                            </Link>
                            <Link to="following">
                                <div className="font-semibold ml-6">
                                    {profile?.following?.length}
                                    <span className="text-gray-400 text-sm ml-1">
                                        Following
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-32 text-center my-2">
                    {user._id === profile._id ? (
                        <div className="flex justify-center sm:flex-col">
                            <button
                                onClick={() => navigate('/profile/settings')}
                                className="border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white px-2 py-1 my-1 mx-2 w-24 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => logOutHandler()}
                                className="border-2 border-red-600 text-red-700 hover:bg-red-500 hover:text-white text-white px-2 py-1 my-1 mx-2 w-24 rounded"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() =>
                                isFollowing
                                    ? dispatch(unFollowUser(profile?._id))
                                    : dispatch(followUser(profile?._id))
                            }
                            className="rounded px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>
            <div>
                <div className="text-gray-600">Bio</div>
                <p>{profile?.bio}</p>
            </div>
        </div>
    );
};
