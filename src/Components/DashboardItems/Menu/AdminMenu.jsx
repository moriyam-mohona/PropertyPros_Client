import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        label={"Manage Properties"}
        address={"manageProperties"}
      ></MenuItem>
      <MenuItem
        label={"Manage Users"}
        address={"manageUsers"}
      ></MenuItem>
    </>
  );
};

export default AdminMenu;
