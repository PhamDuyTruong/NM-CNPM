const initUsers = [{ orderStatus: "", itemsPrice: "0" }];

const UsersReducer = (state = initUsers, action) => {
  switch (action.type) {
    case "USER_UPDATE":
      return [...action.payload];
    case "USER_DETELE":
      return state;
    case "USER_ADD":
      return state;
  }
  return state;
};

export default UsersReducer;