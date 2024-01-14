const userConfig = [
  {
    name: "user_id",
    label: "User ID",
    type: "text",
    mapTo: "id",
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    mapTo: "firstName",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    mapTo: "lastName",
  },
  {
    name: "profile_image_path",
    label: "Profile Image",
    type: "file",
    mapTo: "imagePath",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    mapTo: "email",
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "user", name: "User" },
      { value: "admin", name: "Admin" },
      { value: "inactive", name: "Inactive" },
      { value: "banned", name: "Banned" },
      { value: "deleted", name: "Deleted" },
    ],
    mapTo: "category",
    // shouldRender: (userData) => {
    //     // Only render this field if the user is an admin
    //     return userData && userData.category !== 'user';
    // }
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    mapTo: "password",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    mapTo: "bio",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    mapTo: "location",
  },
  // Additional fields can be added as required
];

export default userConfig;
