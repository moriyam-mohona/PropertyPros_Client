import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        label={"Manage Properties"}
        address={"manageProperties"}
      ></MenuItem>
      <MenuItem label={"Manage Users"} address={"manageUsers"}></MenuItem>
      <MenuItem label={"Manage Request"} address={"manageRequest"}></MenuItem>
      <MenuItem label={"Manage Reviews"} address={"manageReviews"}></MenuItem>
      <MenuItem
        label={"Advertise property"}
        address={"advertiseProperty"}
      ></MenuItem>
    </>
  );
};

export default AdminMenu;
