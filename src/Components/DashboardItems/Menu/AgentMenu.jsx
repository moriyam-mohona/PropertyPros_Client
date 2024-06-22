import MenuItem from "./MenuItem";

const AgentMenu = () => {
  return (
    <>
      <MenuItem label={"Add Property"} address={"addProperty"}></MenuItem>
      <MenuItem
        label={"My Added Properties"}
        address={"myAddedProperties"}
      ></MenuItem>
    </>
  );
};

export default AgentMenu;
