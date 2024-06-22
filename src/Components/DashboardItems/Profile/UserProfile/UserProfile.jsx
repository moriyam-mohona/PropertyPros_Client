import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";

const UserProfile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  if (isLoading) return <p>Loading</p>;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">User Name</label>
          <p className="text-gray-700 mt-1">{user.displayName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">User Image</label>
          <img
            src={user.photoURL}
            alt="User"
            className="w-full h-auto"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>
        {role !== "user" && (
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <p className="text-gray-700 mt-1">{role}</p>
          </div>
        )}
        {/* Add other relevant information here */}
      </div>
    </div>
  );
};

export default UserProfile;
