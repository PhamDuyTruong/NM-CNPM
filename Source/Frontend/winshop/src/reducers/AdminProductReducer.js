const initialState = [];

const AdminProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADMIN_PRODUCT_UPDATE":
      return [...payload];

    default:
      return state;
  }
};

export default AdminProductReducer