import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { axiosCommon } from "../../../Hooks/useAxiosCommon";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosCommon("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      });
  };

  const handleMakeAdmin = (userEmail) => {
    axiosCommon
      .patch(`/user/${userEmail}`, { role: "admin" })
      .then((res) => {
        toast.success("User role updated to Admin successfully.");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        toast.error("Failed to update user role to Admin.");
      });
  };

  const handleMarkFraud = (userEmail) => {
    axiosCommon
      .patch(`/user/${userEmail}`, { role: "fraud" })
      .then((res) => {
        toast.warn("User role updated to Fraud.");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        toast.error("Failed to make fraud");
      });
  };

  const handleDeleteUser = (userId) => {
    axiosCommon
      .delete(`/user/${userId}`)
      .then((res) => {
        toast.success("User deleted successfully.");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      });
  };

  const handleMakeAgent = (userEmail) => {
    axiosCommon
      .patch(`/user/${userEmail}`, { role: "agent" })
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
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">#</th>
              <th className="px-4 py-2 text-left text-gray-600">User Name</th>
              <th className="px-4 py-2 text-left text-gray-600">User Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  {user.role !== "fraud" && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      disabled={user.role === "admin"}
                      onClick={() => handleMakeAdmin(user.email)}
                    >
                      {user.role === "admin" ? "Admin" : "Make Admin"}
                    </button>
                  )}
                  {user.role !== "fraud" && (
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
                  )}
                  {user.role !== "fraud" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleMarkFraud(user.Email)}
                    >
                      Mark Fraud
                    </button>
                  )}

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

export default ManageUsers;
