import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserNotifications } from '../features/Notifications/notifySlice';
import { Loader, InitialDP, getTimeAgo } from '../components';

export default function Notifications() {
    const { status } = useSelector((state) => state.auth);
    const { notifyStatus, notifications } = useSelector(
        (state) => state.notify
    );
    const dispatch = useDispatch();

    useEffect(() => {
        status === 'profileLoaded' && dispatch(getUserNotifications());
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="rounded-md bg-white py-2 px-4 mb-4 text-2xl text-gray-600">
                Notifications
            </div>
            {notifyStatus === 'loading' && <Loader />}
            {notifications.length === 0 && (
                <div className="text-center">You have no notifications.</div>
            )}
            {notifications &&
                notifications.map(
                    ({ sourceUser, _id, time, notificationType, post }) => {
                        const notifyType = () => {
                            switch (notificationType) {
                                case 'LIKE':
                                    return ' recently like your ';
                                case 'COMMENT':
                                    return ' commented on your ';
                                case 'NEW POST':
                                    return ' made a new ';
                                case 'NEW FOLLOWER':
                                    return ' followed you.';
                                default:
                                    return '';
                            }
                        };
                        return (
                            <div
                                key={_id}
                                className="rounded-md bg-white shadow py-2 px-4 my-2 flex"
                            >
                                <div>
                                    {sourceUser.profilePhoto ? (
                                        <img
                                            className="w-10 h-auto rounded-md"
                                            src={sourceUser.profilePhoto}
                                            alt={sourceUser.name}
                                        />
                                    ) : (
                                        <InitialDP
                                            name={sourceUser.name}
                                            size={10}
                                            fontSize={'text-xl'}
                                        />
                                    )}
                                </div>
                                <div className="ml-2 text-gray-800">
                                    <p>
                                        <Link
                                            className="font-medium hover:underline text-black"
                                            to={`/profile/${sourceUser._id}`}
                                        >
                                            {sourceUser.name}
                                        </Link>
                                        {notifyType()}
                                        {post && (
                                            <Link
                                                className="font-medium hover:underline"
                                                to={`/feed/${post}`}
                                            >
                                                post
                                            </Link>
                                        )}
                                    </p>
                                    <p className="text-xs font-medium text-gray-600">
                                        {getTimeAgo(time)} ago
                                    </p>
                                </div>
                            </div>
                        );
                    }
                )}
        </div>
    );
}
