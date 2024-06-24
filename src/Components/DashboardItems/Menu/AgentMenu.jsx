import MenuItem from "./MenuItem";

const AgentMenu = () => {
  return (
    <>
      <MenuItem label={"Add Property"} address={"addProperty"}></MenuItem>
      <MenuItem
        label={"My Added Properties"}
        address={"myAddedProperties"}
      ></MenuItem>
      <MenuItem
        label={"Requested Properties"}
        address={"requestedProperties"}
      ></MenuItem>
      <MenuItem label={"Sold Properties"} address={"soldProperties"}></MenuItem>
    </>
  );
};

export default AgentMenu;
