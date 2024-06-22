import useAuth from "../../../../Hooks/useAuth";
// import { axiosCommon } from "../../../../Hooks/useAxiosCommon";
import { axiosSecure } from "../../../../Hooks/useAxiosSecure";
import useRole from "../../../../Hooks/useRole";

const UserProfile = () => {
  const { user } = useAuth();

  const [role, isLoading] = useRole();
  const handleRequest = () => {
    axiosSecure(`/user`, { status: "Requested" });
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              User Name :{" "}
            </label>
            <p className="text-gray-700 mt-1">{user.displayName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              User Image :{" "}
            </label>
            <div className="flex justify-center mt-2">
              <img
                src={user.photoURL}
                alt="User"
                className="rounded-full border-2 border-gray-300"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
          {role !== "user" ? (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Role</label>
              <p className="text-gray-700 mt-1">{role}</p>
            </div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={handleRequest}
                className="cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition"
              >
                Request For Host
              </button>
            </div>
          )}
          {/* Add other relevant information here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
