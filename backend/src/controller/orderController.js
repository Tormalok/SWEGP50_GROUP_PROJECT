// @desc Get all orders
// @route GET '/api/orders'
// @access Private
const getOrders = (req, res) => {
  res.status(200).json({ message: 'Get all orders' });
};

// @desc Get an order
// @route GET '/api/orders/:orderId'
// @access Private
const getOrder = (req, res) => {
  res.status(200).json({ message: 'Get an order' });
};

// @desc Create an order
// @route POST '/api/orders'
// @access Private
const createOrder = (req, res) => {
  res.status(200).json({ message: 'Create an order' });
};

// @desc Update an order
// @route PUT '/api/orders/:orderId'
// @access Private
const updateOrder = (req, res) => {
  res.status(200).json({ message: 'Update an order' });
};

// @desc Delete an order
// @route DELETE '/api/orders/:orderId'
// @access Private
const deleteOrder = (req, res) => {
  res.status(200).json({ message: 'Delete an order' });
};

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
