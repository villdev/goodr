import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { updatePostOnFeed } from '../features/posts/postsSlice';
import { updatePostOnProfile } from '../features/profile/profileSlice';
import { PostCard, InitialDP, Loader, getTimeAgo } from '../components';
import {
    getSinglePost,
    postComment,
    deleteComment
} from '../features/posts/request';

export default function PostDetails() {
    const { status, user } = useSelector((state) => state.auth);
    const { singlePost, postStatus } = useSelector((state) => state.posts);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {
        if (status === 'profileLoaded') {
            dispatch(getSinglePost(postId));
        }
        // eslint-disable-next-line
    }, [postId, status]);

    const makeCommentHandler = () => {
        let clonedPost = JSON.parse(JSON.stringify(singlePost));

        if (comment) {
            let variable = {
                comment,
                postId
            };
            clonedPost.comments.push(variable);
            // update in db
            dispatch(postComment(variable));
            // update in local
            dispatch(updatePostOnFeed(clonedPost));
            // update in profile
            dispatch(updatePostOnProfile(clonedPost));
            setComment('');
        }
    };

    const deleteCommentHandler = (commentID) => {
        let variable = {
            postId,
            commentID
        };
        dispatch(deleteComment(variable));
    };

    return (
        <div>
            {postStatus === 'post-loading' && <Loader />}
            <button
                className="flex items-center text-blue-600 font-medium"
                onClick={() => navigate(-1)}
            >
                <i className="bx bx-chevron-left text-2xl"></i> Back
            </button>
            {postStatus === 'Deleted' ? (
                <div className="bg-white rounded p-8 mt-2">
                    <p className="text-center text-gray-800">
                        Post has been removed.
                    </p>
                </div>
            ) : (
                singlePost && (
                    <div>
                        <PostCard post={singlePost} />
                        <div className="bg-white shadow rounded-md p-4">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="bg-gray-50 w-full p-2 rounded"
                                placeholder="Comment..."
                            />
                            <div className="flex justify-end border-b">
                                <button
                                    onClick={() => makeCommentHandler()}
                                    className="border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white px-2 py-1 my-1 mx-2 w-24 rounded"
                                >
                                    {postStatus === 'commenting' ? (
                                        <i className="animate-spin bx bx-loader-alt font-thin"></i>
                                    ) : (
                                        'Comment'
                                    )}
                                </button>
                            </div>
                            <div>
                                {singlePost.comments.map((item) => (
                                    <div key={item._id} className="border-b">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="my-2">
                                                    {item.commentBy
                                                        .profilePhoto ? (
                                                        <img
                                                            className="w-10 h-auto rounded-md"
                                                            src={
                                                                item.commentBy
                                                                    .profilePhoto
                                                            }
                                                            alt={
                                                                item.commentBy
                                                                    .name
                                                            }
                                                        />
                                                    ) : (
                                                        <InitialDP
                                                            name={
                                                                item.commentBy
                                                                    .name
                                                            }
                                                            size={10}
                                                            fontSize={'text-xl'}
                                                        />
                                                    )}
                                                </div>
                                                <div className="ml-6">
                                                    <h4 className="text-lg font-semibold">
                                                        {item.commentBy.name}
                                                    </h4>
                                                    <span className="text-sm text-gray-400 font-normal">
                                                        @
                                                        {
                                                            item.commentBy
                                                                .username
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                {item.commentBy._id ===
                                                    user._id && (
                                                    <button
                                                        onClick={() =>
                                                            deleteCommentHandler(
                                                                item._id
                                                            )
                                                        }
                                                        className="text-xs w-16 font-semibold border-2 border-red-600 text-red-700 hover:bg-red-600 hover:text-white px-2 py-1 my-1 mx-2 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                                <span className="text-xs font-medium text-gray-600">
                                                    {getTimeAgo(item.createdAt)}{' '}
                                                    ago
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-6">
                                            <p>{item.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
