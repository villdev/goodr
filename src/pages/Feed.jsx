import { useSelector } from 'react-redux';
import { Loader, NewPost, PostCard } from '../components';

export default function Feed() {
    const { feedPosts, postStatus } = useSelector((state) => state.posts);

    return (
        <div>
            <NewPost />
            {postStatus === 'loading' && <Loader />}
            {feedPosts?.map((post) => (
                <PostCard key={post?._id} post={post} />
            ))}
        </div>
    );
}
