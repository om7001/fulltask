import { useEffect, useState } from "react";
import Button from "../useForm/Button";
import Input from "../useForm/Input";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWING, GET_BLOCKED, GET_REQUESTED, GET_REJECTED, GET_SEARCH_FOLLOW, GET_FOLLOWING_POST } from "../../GraphQL/query";
import { USER_REQUEST, USER_REQUEST_ANSWER } from "../../GraphQL/mutation";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

function FollowUser() {
    // const navigator = useNavigate()

    const [search, setSearch] = useState('');
    const [followers, setFollowers] = useState(true);
    const [following, setFollowing] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [requested, setRequested] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [post, setPost] = useState(false);
    const [id, setId] = useState(false);

    const [CreateFollowers] = useMutation(USER_REQUEST);
    const [UserOnRequestAnswer] = useMutation(USER_REQUEST_ANSWER);

    const { loading: followersLoading, error: followersError, data: followersData, refetch: followersRefetch } = useQuery(GET_FOLLOWERS);
    const { loading: followingLoading, error: followingError, data: followingData, refetch: followingRefetch } = useQuery(GET_FOLLOWING);
    const { loading: blockedLoading, error: blockedError, data: blockedData, refetch: blockedRefetch } = useQuery(GET_BLOCKED);
    const { loading: requestedLoading, error: requestedError, data: requestedData, refetch: requestedRefetch } = useQuery(GET_REQUESTED);
    const { loading: rejectedLoading, error: rejectedError, data: rejectedData, refetch: rejectedRefetch } = useQuery(GET_REJECTED);
    const { loading: searchUserLoading, error: searchUserError, data: searchUserData, refetch: searchUserRefetch } = useQuery(GET_SEARCH_FOLLOW, {
        variables: { search },
        fetchPolicy: 'network-only'
    });
    console.log(rejectedData);
    const handleShowFollowers = () => {
        setFollowers(true);
        setFollowing(false);
        setBlocked(false);
        setRequested(false);
        setPost(false)
        setRejected(false)
        followersRefetch()
    };

    const handleShowFollowing = () => {
        setFollowers(false);
        setFollowing(true);
        setBlocked(false);
        setRequested(false);
        setPost(false)
        setRejected(false)
        followingRefetch()
    };

    // console.log(requestedData);
    const handleShowBlocked = () => {
        setFollowers(false);
        setFollowing(false);
        setBlocked(true);
        setRequested(false);
        setPost(false)
        setRejected(false)
        blockedRefetch();
    };

    const handleShowRequested = () => {
        setFollowers(false);
        setFollowing(false);
        setBlocked(false);
        setRequested(true);
        setPost(false)
        setRejected(false)
        requestedRefetch()
    };

    const handleShowRejected = () => {
        setFollowers(false);
        setFollowing(false);
        setBlocked(false);
        setRequested(false);
        setPost(false)
        setRejected(true)
        requestedRefetch()
    }

    const sendRequested = () => {
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

    const sendRErequested = (e, name) => {
        e.preventDefault();
        if (rejectedData && rejectedData.getRejectedUser) {
            CreateFollowers({
                variables: {
                    input: {
                        userName: name,
                        status: "requested"
                    }
                },
                fetchPolicy: 'network-only'
            });
        }
    }
    console.log(blockedData);

    const handleSetValue = (e, Id, status) => {
        e.preventDefault();
        UserOnRequestAnswer({
            variables: {
                input: {
                    status: status,
                    followerId: String(Id)
                }
            },
            fetchPolicy: 'network-only'
        });
    }


    const handleShowPost = (e, Id) => {
        e.preventDefault();
        setId(Id)
        setFollowing(false)
        setPost(true)
    }

    const { loading: postLoading, error: postError, data: postData, refetch: postRefetch } = useQuery(GET_FOLLOWING_POST, {
        variables: {
            input: {
                followerId: String(id)
            }
        },
        fetchPolicy: 'network-only'
    });

    const handleDebounce = debounce((value) => {
        setSearch(value);
        setFollowers(false);
        setFollowing(false);
        setBlocked(false);
        setRequested(false);
        setPost(false)
    }, 2000);

    const handleSearch = (e) => {
        const inputValue = e.target.value;
        handleDebounce(inputValue);
        setFollowers(false);
    };

    useEffect(() => {
        searchUserRefetch()
    }, [searchUserRefetch])

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
                    className={`flex-1 m-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${requested ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''}`}
                    onClick={handleShowRequested}
                />
                <Button
                    label={"Rejected"}
                    className={`flex-1 m-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 ${requested ? 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : ''}`}
                    onClick={handleShowRejected}
                />
                <div className="flex items-center m-6">
                    <Input
                        type="text"
                        name="Search"
                        id="Search"
                        placeholder="Search..."
                        className=""
                        onChange={(e) => { handleSearch(e), setFollowers(false) }}
                    />
                </div>
            </div>
            {followersLoading || followingLoading || blockedLoading || requestedLoading || searchUserLoading || postLoading ? <div>Loading...</div> : <div className="flex p-4">
                {searchUserData && searchUserData.getFollow && (
                    <div className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{searchUserData.getFollow.userName}</div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={sendRequested}>
                                    Requested
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {post && postData && postData.getFollowingPost && postData.getFollowingPost.map((post, index) => (
                    <div className="bg-slate-100 m-2 p-3 rounded-xl shadow-md overflow-hidden" key={index}>
                        <div className="p-5">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.description}</p>
                            <p className="text-sm text-gray-500">Created by: {post.createdBy?.firstName} {post.createdBy?.lastName}</p>
                        </div>
                    </div>
                ))}
                {followers && followersData && followersData.getFollower && followersData.getFollower.map((follower, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{follower.followerId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{follower.userId.userName}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
                {following && followingData && followingData.getFollowing && followingData.getFollowing.map((follower, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{follower.userId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{follower.followerId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <Link to={`post`} onClick={(e) => handleShowPost(e, follower.followerId._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Show Post
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                {blocked && blockedData && blockedData.getBlockUser && blockedData.getBlockUser.map((blockedUser, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{blockedUser.userId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{blockedUser.followerId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <button 
                                onClick={(e) => handleSetValue(e, blockedUser.userId._id, "accepted")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Unblock
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {requested && requestedData && requestedData.getRequestedUser && requestedData.getRequestedUser?.map((requestedUser, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-96 rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{requestedUser.followerId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{requestedUser.userId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={(e) => handleSetValue(e, requestedUser.userId._id, "accepted")}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Accepted
                                </button>
                                <button
                                    onClick={(e) => handleSetValue(e, requestedUser.userId._id, "rejected")}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Rejected
                                </button>
                                <button
                                    onClick={(e) => handleSetValue(e, requestedUser.userId._id, "blocked")}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Blocked
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {rejected && rejectedData && rejectedData.getRejectedUser && rejectedData.getRejectedUser.map((rejectedUser, index) => (
                    <div key={index} className="flex-1 m-2 bg-slate-300 max-w-xs rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{rejectedUser.userId.userName}</div>
                            <div className="mb-4">
                                <p className="text-gray-700 text-base">Username: <span className="text-gray-900 font-semibold">{rejectedUser.followerId.userName}</span></p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={(e) => sendRErequested(e, rejectedUser.followerId.userName)}>
                                    Requested
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>}
        </div>
    );
}

export default FollowUser;
