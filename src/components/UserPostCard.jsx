import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { likePost, unLikePost, deletePost } from '../features/posts/request';
import {
    removePostOnProfile,
    updatePostOnProfile
} from '../features/profile/profileSlice';
import { InitialDP, alreadyExist, getTimeAgo } from '.';
import { updatePostOnFeed } from '../features/posts/postsSlice';

export const UserPostCard = ({ post }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isPostAlreadyLiked = alreadyExist(post.likes, user?._id);

    const likePostOnFeed = (userId) => {
        // create copy of post
        let clonedPost = JSON.parse(JSON.stringify(post));

        if (isPostAlreadyLiked) {
            let updatedLikes = clonedPost.likes.filter(
                (like) => like !== userId
            );
            clonedPost.likes = updatedLikes;
            // update in db
            dispatch(unLikePost(post._id));
        } else {
            clonedPost.likes.push(userId);
            // update in db
            dispatch(likePost(post._id));
        }
        // update in localState
        dispatch(updatePostOnFeed(clonedPost));
        dispatch(updatePostOnProfile(clonedPost));
    };

    const deleteHandler = () => {
        let postId = post._id;
        dispatch(deletePost(postId));
        dispatch(removePostOnProfile(postId));
    };

    return (
        <div className="my-4 bg-white rounded-md">
            <div className="p-3 border-b">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        {post.creator.profilePhoto ? (
                            <img
                                className="w-10 h-auto rounded-md"
                                src={post.creator.profilePhoto}
                                alt={post.creator.name}
                            />
                        ) : (
                            <InitialDP
                                name={post.creator.name}
                                size={10}
                                fontSize={'text-xl'}
                            />
                        )}
                        <div className="ml-3 leading-4">
                            <h4 className="font-medium">{post.creator.name}</h4>
                            <span className="text-sm font-medium text-gray-500">
                                @{post.creator.username}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-medium text-gray-600">
                            {getTimeAgo(post.createdAt)} ago
                        </span>
                    </div>
                </div>
                <div className="p-2 my-1">
                    <p className="mt-2 mb-4">{post.content}</p>
                    {post.postMedia && (
                        <img
                            className="w-full h-auto rounded"
                            src={post.postMedia}
                            alt={post.content.substring(0, 15)}
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-around p-1">
                <button
                    onClick={() => likePostOnFeed(user?._id)}
                    className="flex items-center"
                >
                    <i
                        className={`text-lg bx ${
                            isPostAlreadyLiked
                                ? 'bxs-heart text-red-600'
                                : 'bx-heart'
                        }`}
                    ></i>
                    <span className="text-gray-400 font-normal ml-1">
                        {post?.likes.length > 0 && post?.likes.length}
                    </span>
                </button>
                <button
                    onClick={() => navigate(`/feed/${post._id}`)}
                    className="flex items-center"
                >
                    <i className="text-lg bx bx-comment"></i>
                    <span className="text-gray-400 font-normal ml-1">
                        {post?.comments.length > 0 && post?.comments.length}
                    </span>
                </button>
                {user?._id === post.creator._id && (
                    <button
                        onClick={deleteHandler}
                        className="flex items-center"
                    >
                        <i className="text-lg bx bx-trash"></i>
                    </button>
                )}
            </div>
        </div>
    );
};
