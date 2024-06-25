import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem label={"User Profile"} address={""}></MenuItem>
      <MenuItem label={"Wishlist "} address={"wishlist"}></MenuItem>
      <MenuItem label={"My Reviews"} address={"myReviews"}></MenuItem>
      <MenuItem label={"Property Bought"} address={"propertyBought"}></MenuItem>
    </>
  );
};

export default UserMenu;
