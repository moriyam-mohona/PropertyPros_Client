import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import { axiosCommon } from "../../../../Hooks/useAxiosCommon";
import SectionTitle from "../../../SectionTitle/SectionTitle";

const UserProfile = () => {
  const { user } = useAuth();
  const [role, isLoading] = useRole();
  const [userData, setUserData] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    axiosCommon(`/user/${user.email}`).then((res) => setUserData(res.data));
  }, [user.email]);

  const handleRequest = () => {
    console.log("handleRequest");
    setIsClicked(true);
    axiosCommon
      .put(`/user/${user.email}`, { status: "Requested" })
      .then((response) => {
        console.log("User status updated successfully:", response.data);
        setUserData((prevUserData) => ({
          ...prevUserData,
          status: "Requested",
        }));
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        // Handle error (e.g., show error message, reset state, etc.)
      });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <SectionTitle heading={"My Profile"} />

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">User Name :</label>
            <p className="text-gray-700 mt-1">{user.displayName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">
              User Image :
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
              {user.role !== "admin" && (
                <button
                  onClick={handleRequest}
                  disabled={userData.status || isClicked}
                  className="cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full transition"
                >
                  {userData.status ? "Requested " : "Request For Host"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
