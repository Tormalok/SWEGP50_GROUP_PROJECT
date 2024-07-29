// @desc Get all products
// @route GET '/api/products'
// @access Private
const getProducts = (req, res, next) => {
  res.status(200).json({ message: 'Get all products' });
};

// @desc Get a product
// @route GET '/api/products/:productId'
// @access Private
const getProduct = (req, res, next) => {
  res.status(200).json({ message: 'Get a product' });
};

// @desc Create a product
// @route POST '/api/products'
// @access Private
const createProduct = (req, res, next) => {
  res.status(200).json({ message: 'Create a product' });
};

// @desc Update a product
// @route PUT '/api/products/:productId'
// @access Private
const updateProduct = (req, res, next) => {
  res.status(200).json({ message: 'Update a product' });
};

// @desc Delete a product
// @route DELETE '/api/products/:productId'
// @access Private
const deleteProduct = (req, res, next) => {
  res.status(200).json({ message: 'Delete a product' });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
