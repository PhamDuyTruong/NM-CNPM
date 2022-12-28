const initState = "light";
export default (state = initState, action) => {
  switch (action.type) {
    case "ADMIN_CHANGE_MODE":
      if (state == "light") return "dark";
      else return "light";
    default:
      return state;
  }
  return state;
};
