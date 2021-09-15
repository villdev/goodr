import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InitialDP, getImageLink } from '.';
import { createNewPost } from '../features/posts/request';
import { addNewPostToProfile } from '../features/profile/profileSlice';

export const NewPost = () => {
    const { user } = useSelector((state) => state.auth);
    const { postStatus } = useSelector((state) => state.posts);
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [postMedia, setPostMedia] = useState('');
    const [isLoading, setLoading] = useState(false);
    const max = 250;
    let contentLength = content.length || 0;
    const dispatch = useDispatch();

    const uploadImage = async () => {
        try {
            setLoading(true);
            const imageLink = await getImageLink(image);
            setPostMedia(imageLink);
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const makePostHandler = async () => {
        if (content || postMedia) {
            let post = {
                content: content,
                postMedia: postMedia
            };
            const response = await dispatch(createNewPost(post));
            if (response) {
                dispatch(addNewPostToProfile(response.payload.savedPost));
            }
            setContent('');
            setPostMedia('');
        }
    };

    return (
        <div>
            <div className="bg-white rounded-md p-4">
                <div className="flex items-center justify-between px-2">
                    {user?.profilePhoto ? (
                        <img
                            className="w-10 h-auto rounded-md"
                            src={user.profilePhoto}
                            alt={user?.name}
                        />
                    ) : (
                        <InitialDP
                            name={user?.name}
                            size={10}
                            fontSize={'text-xl'}
                        />
                    )}
                    <div className="text-blue-600 font-medium text-sm">
                        {contentLength}/{max}
                    </div>
                </div>
                <div className="mt-2">
                    <textarea
                        maxLength={max}
                        type="text"
                        placeholder="What's new?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-gray-50 w-full mx-2 px-1 rounded-md"
                    />
                    {postMedia && (
                        <img
                            src={postMedia}
                            className="w-full h-auto rounded-md p-2"
                            alt="post"
                        />
                    )}
                </div>
                <div className="flex justify-end">
                    <div className="my-2 mr-4">
                        <label className="bg-white text-blue px-4 py-2 rounded border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
                            <span className="mt-2 text-base leading-normal my-2">
                                <i className="bx bx-upload"></i>
                            </span>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <button
                        onClick={() => uploadImage()}
                        className="text-sm px-4 py-1 mr-4 font-medium text-blue-600 rounded border border-blue cursor-pointer"
                    >
                        {isLoading ? (
                            <i className="animate-spin bx bx-loader-alt font-thin"></i>
                        ) : (
                            'Upload Image'
                        )}
                    </button>
                    <button
                        disabled={contentLength > max ? true : false}
                        onClick={() => makePostHandler()}
                        className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded"
                    >
                        {postStatus === 'posting' ? (
                            <i className="animate-spin bx bx-loader-alt font-thin"></i>
                        ) : (
                            'Post'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
