// @desc Get all carts
// @route GET '/api/carts'
// @access Private
const getCarts = (req, res) => {
  res.status(200).json({ message: 'Get all carts' });
};

// @desc Get a cart
// @route GET '/api/carts/:cartId'
// @access Private
const getCart = (req, res) => {
  res.status(200).json({ message: 'Get a cart' });
};

// @desc Create a cart
// @route POST '/api/carts'
// @access Private
const createCart = (req, res) => {
  res.status(200).json({ message: 'Create a cart' });
};

// @desc Update a cart
// @route PUT '/api/carts/:cartId'
// @access Private
const updateCart = (req, res) => {
  res.status(200).json({ message: 'Update a cart' });
};

// @desc Delete a cart
// @route DELETE '/api/carts/:cartId'
// @access Private
const deleteCart = (req, res) => {
  res.status(200).json({ message: 'Delete a cart' });
};

export { getCarts, getCart, createCart, updateCart, deleteCart };
