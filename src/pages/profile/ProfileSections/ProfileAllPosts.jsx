import ProfilePost from "../../../components/TypesOfRecipeCards/ProfilePost";
const ProfileAllPosts = ({ user, recipes, reviews }) => {
  //TODO
  //Sort by date
  const allPosts = [...recipes, ...reviews];

  return (
    <div className="profile-all-posts mt-4 grid grid-cols-3">
      {allPosts.map((post, i) => (
        <ProfilePost key={i} reviewer={user} post={post} />
      ))}
    </div>
  );
};

export default ProfileAllPosts;
