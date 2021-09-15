import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../features/profile/request';
import { InitialDP, getImageLink } from '.';
import { resetProfile } from '../features/profile/profileSlice';

export const ProfileUpdate = ({ profile, profileStatus }) => {
    const dispatch = useDispatch();

    const [profileData, setProfileData] = useState({
        name: profile?.name || '',
        username: profile?.username || '',
        bio: profile?.bio || '',
        profilePhoto: profile?.profilePhoto || ''
    });
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const profileUpdatesInput = (e) => {
        const value = e.target.value;
        setProfileData({
            ...profileData,
            [e.target.name]: value
        });
    };

    const uploadImage = async () => {
        try {
            setLoading(true);
            const link = await getImageLink(image);
            setProfileData({
                ...profileData,
                profilePhoto: link
            });
            setLoading(false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = () => {
        const response = dispatch(updateUserProfile(profileData));
        if (response) {
            dispatch(resetProfile());
        }
    };

    return (
        <div className="bg-white rounded-md p-4">
            <h1 className="text-2xl mt-3">Profile</h1>
            <div className="flex items-center flex-col">
                {profileData?.profilePhoto ? (
                    <img
                        className="w-36 h-auto rounded-md"
                        src={profileData?.profilePhoto}
                        alt={profileData?.name}
                    />
                ) : (
                    <InitialDP
                        name={profileData?.name}
                        size={36}
                        fontSize={'text-7xl'}
                    />
                )}
                <div className="my-2">
                    <label className="bg-white text-blue px-4 py-1 rounded border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
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
                    className="text-sm px-4 py-1 font-medium text-blue-600 rounded border border-blue cursor-pointer"
                >
                    {loading ? (
                        <i className="animate-spin bx bx-loader-alt font-thin"></i>
                    ) : (
                        'Upload Image'
                    )}
                </button>
            </div>
            <form className="mt-6">
                <div className="my-5 text-sm">
                    <label htmlFor="name" className="block text-gray-600">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        defaultValue={profileData?.name}
                        onChange={(e) => profileUpdatesInput(e)}
                        className="rounded font-normal px-4 py-2 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Name"
                    />
                </div>
                <div className="my-5 text-sm">
                    <label htmlFor="username" className="block text-gray-600">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        defaultValue={profileData?.username}
                        onChange={(e) => profileUpdatesInput(e)}
                        className="rounded font-normal px-4 py-2 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Username"
                    />
                </div>
                <label htmlFor="bio" className="block text-gray-600 mt-2">
                    Bio
                </label>
                <textarea
                    id="bio"
                    type="text"
                    name="bio"
                    defaultValue={profile?.bio}
                    onChange={(e) => profileUpdatesInput(e)}
                    className="rounded font-normal px-4 py-2 mt-1 focus:outline-none bg-gray-100 w-full"
                    placeholder="Bio"
                />

                <div className="flex justify-between">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            updateProfile();
                        }}
                        className="text-lg text-white bg-blue-400 p-2 duration-300 rounded hover:bg-blue-700 w-full"
                    >
                        {profileStatus === 'updating' ? (
                            <i className="animate-spin bx bx-loader-alt font-thin"></i>
                        ) : (
                            'Update'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
