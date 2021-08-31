export default (item) => {
  return {
    name: `${item.name.first} ${item.name.last}`,
    photo: item.picture.thumbnail,
    large_photo: item.picture.large,
    login: item.login.username,
    email: item.email,
    phone: item.phone,
    rating: 0,
  };
};
