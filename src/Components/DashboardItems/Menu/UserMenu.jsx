import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem label={"User Profile"} address={"userProfile"}></MenuItem>
      <MenuItem label={"Wishlist "} address={"wishlist"}></MenuItem>
      <MenuItem
        label={" Property Bought"}
        address={"propertyBought"}
      ></MenuItem>
      <MenuItem label={"My Reviews"} address={"myReviews"}></MenuItem>
    </>
  );
};

export default UserMenu;
