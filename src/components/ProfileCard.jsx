import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unFollowUser } from '../features/auth/request';
import { InitialDP, alreadyExist } from '.';

export const ProfileCard = ({ profile }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const isFollowing = alreadyExist(user?.following, profile._id);

    return (
        <div className="rounded-md bg-white py-2 px-4 my-4 flex items-center justify-between">
            <Link to={`/profile/${profile._id}`}>
                <div className="flex items-center">
                    <div className="my-2">
                        {profile.profilePhoto ? (
                            <img
                                className="w-12 h-auto rounded-md"
                                src={profile.profilePhoto}
                                alt={profile.name}
                            />
                        ) : (
                            <InitialDP
                                name={profile.name}
                                size={12}
                                fontSize={'text-xl'}
                            />
                        )}
                    </div>
                    <div className="ml-6">
                        <h4 className="text-lg">{profile.name}</h4>
                        <span className="text-sm font-medium text-gray-500">
                            @{profile.username}
                        </span>
                    </div>
                </div>
            </Link>
            <div>
                {user._id !== profile._id && (
                    <button
                        onClick={() =>
                            isFollowing
                                ? dispatch(unFollowUser(profile._id))
                                : dispatch(followUser(profile._id))
                        }
                        className="rounded px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                )}
            </div>
        </div>
    );
};
