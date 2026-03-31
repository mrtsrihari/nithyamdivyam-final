const Order = require('../models/Order');

// @desc  Create new order
// @route POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, address, items, totalPrice, notes } = req.body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const order = await Order.create({ customerName, phone, address, items, totalPrice, notes });
    res.status(201).json({ success: true, message: 'Order placed successfully!', data: order });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all orders (admin)
// @route GET /api/orders
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single order
// @route GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc  Update order status (admin)
// @route PUT /api/orders/:id
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    next(error);
  }
};

// @desc  Get order stats (admin)
// @route GET /api/orders/stats
const getOrderStats = async (req, res, next) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: 'Pending' });
    const completed = await Order.countDocuments({ status: 'Completed' });
    const processing = await Order.countDocuments({ status: 'Processing' });
    const recent = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({ success: true, data: { total, pending, completed, processing, recent } });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, getOrderStats };
