const initOrders = [{ orderStatus: "", itemsPrice: "0", cart: [] }];

const AdminOrdersReducer = (state = initOrders, action) => {
  switch (action.type) {
    case "ADMIN_ORDER_UPDATE":
      return [...action.payload];
    case "ADMIN_ORDER_DETELE":
      return state;
    case "ADMIN_ORDER_ADD":
      return state;
  }
  return state;
};

export default AdminOrdersReducer;