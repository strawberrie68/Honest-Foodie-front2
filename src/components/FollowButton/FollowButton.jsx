import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser, setFollowing } from "../../redux/authRedux";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

const FollowButton = ({ userToFollow, onFollowChange }) => {
  const apiUrl = process.env.VITE_API_URL || "";

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/${currentUser.id}/following`,
        );
        const followingArray = Array.isArray(response.data)
          ? response.data
          : [];
        dispatch(setFollowing(followingArray));
      } catch (error) {
        console.error("Failed to fetch following list:", error);
        dispatch(setFollowing([]));
      }
    };

    if (currentUser?.id && !Array.isArray(currentUser?.following)) {
      fetchFollowing();
    }
  }, [currentUser?.id, dispatch, apiUrl]);

  if (
    !currentUser?.id ||
    !userToFollow?.id ||
    currentUser.id === userToFollow.id
  ) {
    return null;
  }

  const following = Array.isArray(currentUser?.following)
    ? currentUser.following
    : [];
  const isFollowing = following.some((u) => u.id === userToFollow.id);

  const handleClick = async () => {
    if (!currentUser?.id || !userToFollow?.id) return;

    try {
      if (isFollowing) {
        // Unfollow logic
        const response = await axios.post(
          `${apiUrl}/api/users/${userToFollow.id}/unfollow/`,
          {
            followerId: currentUser.id,
          },
        );
        if (response.status === 200) {
          dispatch(unfollowUser({ userId: userToFollow.id }));
          // Notify parent component to update profile
          onFollowChange && onFollowChange(false);
        }
      } else {
        // Follow logic
        const response = await axios.post(
          `${apiUrl}/api/users/${userToFollow.id}/follow/`,
          {
            followerId: currentUser.id,
          },
        );
        if (response.status === 200) {
          dispatch(followUser({ user: userToFollow }));
          // Notify parent component to update profile
          onFollowChange && onFollowChange(true);
        }
      }
    } catch (error) {
      console.error("Follow/Unfollow action failed:", error);
    }
  };

  return (
    <button
      className="flex h-8 shrink basis-4/5 items-center justify-center rounded-lg bg-primary-gray-50 px-2 py-1 text-xxs font-bold sm:grow sm:px-3 md:h-7 md:px-4"
      onClick={handleClick}
    >
      {isFollowing ? "Unfollow" : "Follow"}
      <CaretDown size={16} className="ml-2 hidden xs:block" />
    </button>
  );
};

export default FollowButton;
