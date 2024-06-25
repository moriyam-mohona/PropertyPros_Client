import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageRequest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosCommon("/users")
      .then((res) => {
        setUsers(res.data.filter((user) => user.status === "Requested"));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      });
  };

  const handleMakeAdmin = (userId) => {
    axiosCommon
      .put(`/user/${userId}`, { role: "admin" })
      .then((res) => {
        toast.success("User role updated to Admin successfully.");
        // Update users state or refresh users list if necessary
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        toast.error("Failed to update user role to Admin.");
      });
  };

  const handleMarkFraud = (userId) => {
    toast.warn("Mark Fraud functionality not implemented.");
  };

  const handleDeleteUser = (userId) => {
    axiosCommon
      .delete(`/user/${userId}`)
      .then((res) => {
        toast.success("User deleted successfully.");
        // Update users state or refresh users list if necessary
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      });
  };
  const handleMakeAgent = (email) => {
    console.log("handle Agent");
    axiosCommon
      .patch(`/user/${email}`, { role: "agent", status: "Verified" })
      .then((res) => {
        toast.success("User role updated to Agent successfully.");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        toast.error("Failed to update user role to Agent.");
      });
  };
  return (
    <div>
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center"></h1>
      <SectionTitle heading={"Manage Requests"} />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">#</th>
              {/* <th className="px-4 py-2 text-left text-gray-600">User Name</th> */}
              <th className="px-4 py-2 text-left text-gray-600">User Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    disabled={user.role === "admin"}
                    onClick={() => handleMakeAdmin(user._id)}
                  >
                    {user.role === "admin" ? "Admin" : "Make Admin"}
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    disabled={
                      user.role === "agent" || user.status === "Verified"
                    }
                    onClick={() => handleMakeAgent(user.email)}
                  >
                    {" "}
                    {user.role === "admin" || user.role === "agent"
                      ? "Agent"
                      : " Make Agent"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleMarkFraud(user._id)}
                  >
                    Mark Fraud
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequest;
