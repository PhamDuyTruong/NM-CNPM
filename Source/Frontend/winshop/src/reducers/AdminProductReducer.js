const initialState = [];

const AdminProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADMIN_PRODUCT_UPDATE":
      return [...payload];
    case "RENDER":
        console.log("render");
        return [...state];
    default:
      return state;
  }
};

export default AdminProductReducer