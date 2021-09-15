import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProfileCard } from "../components";
import { getAllUserProfiles } from "../features/expolre/exploreSlice";

export default function Explore() {
    const { allProfiles, exploreStatus } = useSelector((state) => state.explore);
    const { userId, status } = useSelector((state) => state.auth);
    const [serachUser, setSearchUser] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if(exploreStatus === "idle" && status === "profileLoaded"){
            dispatch(getAllUserProfiles())
        }
        //eslint-disable-next-line
    }, [exploreStatus, status])


    const exploreFeed = serachUser !== "" ? 
        (allProfiles.filter((profile) => 
            profile._id !== userId && (profile.name.includes(serachUser)
            || profile.username.includes(serachUser))
        )) :
        allProfiles.filter((profile) => profile._id !== userId);

    return (
        <Fragment>
            <div className="bg-white rounded-md px-4 py-2">
                <div className="text-gray-600 font-medium">Explore</div>
                <input
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="bg-gray-50 w-full p-2 rounded my-2"
                    placeholder="Search people"
                />
            </div>
            <div className="my-8">
                {
                    exploreFeed?.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile}/>
                    ))
                }
            </div>
        </Fragment>
    )
}



