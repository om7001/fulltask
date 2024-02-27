import { useState } from "react";
import Button from "../useForm/Button";
import Input from "../useForm/Input";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWING, GET_BLOCKED, GET_REQUESTED, GET_SEARCH_FOLLOW } from "../../GraphQL/query";
import { USER_REQUEST } from "../../GraphQL/mutation";
import { debounce } from "lodash";

function FollowUser() {
    const [search, setSearch] = useState('');
    const [followers, setFollowers] = useState(true);
    const [following, setFollowing] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [requested, setRequested] = useState(false);

    const [CreateFollowers] = useMutation(USER_REQUEST);

    const { loading: followersLoading, error: followersError, data: followersData } = useQuery(GET_FOLLOWERS);
    const { loading: followingLoading, error: followingError, data: followingData } = useQuery(GET_FOLLOWING);
    const { loading: blockedLoading, error: blockedError, data: blockedData } = useQuery(GET_BLOCKED);
    const { loading: requestedLoading, error: requestedError, data: requestedData } = useQuery(GET_REQUESTED);
    const { loading: searchUserLoading, error: searchUserError, data: searchUserData } = useQuery(GET_SEARCH_FOLLOW, {
        variables: {
            search
        },
        fetchPolicy: 'network-only'
    });

    const handleShowFollowers = () => {
        setFollowers(true);
        setFollowing(false);
        setBlocked(false);
        setRequested(false);
    };

    const handleShowFollowing = () => {
        setFollowers(false);
        setFollowing(true);
        setBlocked(false);
        setRequested(false);
    };

    const handleShowBlocked = () => {
        setFollowers(false);
        setFollowing(false);
        setBlocked(true);
        setRequested(false);
    };

    const handleShowRequested = () => {
        setFollowers(false);
        setFollowing(false);
        setBlocked(false);
        setRequested(true);
    };

    const sendRequested = () =>{
        console.log(searchUserData);
        if (searchUserData && searchUserData.getFollow) {
            CreateFollowers({
                variables: {
                    input: {
                        userName: searchUserData.getFollow.userName, 
                        status: "requested"
                    }
                },
                fetchPolicy: 'network-only'
            });
        }
    };
    // console.log(sendRequested);
    
    const handleDebounce = debounce((value) => {
        setSearch(value);
    }, 2000);

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        handleDebounce(inputValue);
        setFollowers(false);
    };

    // if (followersLoading || followingLoading || blockedLoading || requestedLoading || searchUserLoading) {
    //     return <div>Loading...</div>;
    // }

    if (followersError || followingError || blockedError || requestedError) {
        return <div>Error: {followersError ? followersError.message : followingError ? followingError.message : blockedError ? blockedError.message : requestedError.message}</div>;
    }

    return (
        <div>
            <div className="flex">
                <Button
                    label={"Followers"}
                    className={`flex-1 m-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${followers ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''}`}
                    onClick={handleShowFollowers}
                />
                <Button
                    label={"Following"}
                    className={`flex-1 m-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${following ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''}`}
                    onClick={handleShowFollowing}
                />
                <Button
                    label={"Blocked"}
                    className={`flex-1 m-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${blocked ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''}`}
                    onClick={handleShowBlocked}
                />
                <Button
                    label={"Requested"}
                    className={`flex-1 m-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${blocked ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''}`}
                    onClick={handleShowRequested}
                />
                <div className="flex items-center m-6">
                    <Input
                        type="text"
                        name="Search"
                        id="Search"
                        placeholder="Search..."
                        className=""
                        onChange={(e) => { handleSearch(e), setFollowers(false) }}

                    // onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

            </div>
            <div className="flex p-4">

                {searchUserData && searchUserData.getFollow && (
                    <div className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{searchUserData.getFollow.userName}</div>
                            {/* <div className="mb-4">
                                <p className="text-gray-700 text-base"><span className="text-gray-900 font-semibold">{follower.followerId && follower.followerId.userName}</span></p>
                            </div> */}
                            <div className="flex justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={sendRequested}>
                                    Requested
                                </button>
                                {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Follow
                                </button> */}
                            </div>
                        </div>
                    </div>
                )}



                {followers && followersData && followersData.getFollower && followersData.getFollower.map((follower, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{follower.userId && follower.userId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{follower.followerId && follower.followerId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Show More
                                </button> */}
                                {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Follow
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
                {following && followingData && followingData.getFollowing && followingData.getFollowing.map((follower, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{follower.followerId && follower.followerId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{follower.userId && follower.userId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Show Post
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
                {blocked && blockedData && blockedData.getBlockUser && blockedData.getBlockUser.map((blockedUser, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{blockedUser.followerId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{blockedUser.userId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Unblock
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {requested && requestedData && requestedData.getRequestedUser && requestedData.getRequestedUser.map((blockedUser, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-96 rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{blockedUser.userId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{blockedUser.followerId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Accepted
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Rejected
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Blocked
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FollowUser;
