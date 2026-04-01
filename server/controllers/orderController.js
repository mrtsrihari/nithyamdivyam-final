const Order = require('../models/Order');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');

// @desc  Create new order
// @route POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, address, email, items, totalPrice, notes } = req.body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check stock for all items
    for (const item of items) {
      const product = await Product.findById(item.product || item._id);
      if (!product) {
        return res.status(400).json({ success: false, message: `Product not found: ${item.name}` });
      }
      if (product.stockQuantity < item.qty) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${item.name}. Only ${product.stockQuantity} remaining.` });
      }
    }

    // Decrement stock
    for (const item of items) {
      const product = await Product.findById(item.product || item._id);
      product.stockQuantity -= item.qty;
      if (product.stockQuantity <= 0) {
        product.inStock = false;
        product.stockQuantity = 0;
      }
      await product.save();
    }

    const order = await Order.create({ customerName, phone, email, address, items, totalPrice, notes });

    // --- EMAIL NOTIFICATIONS ---
    const adminEmail = process.env.EMAIL_USER;

    // 1. Notify Admin (if EMAIL_USER configured)
    if (adminEmail) {
      await sendEmail({
        email: adminEmail,
        subject: `New Order Received - ₹${totalPrice}`,
        html: `<h2>New Order Received!</h2><p><strong>Customer:</strong> ${customerName}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Total:</strong> ₹${totalPrice}</p><p>Check your Admin Dashboard for details.</p>`,
      });
    }

    // 2. Notify Customer (if email provided)
    if (email) {
      await sendEmail({
        email: email,
        subject: `Order Received - Nithyam Divyam Spices`,
        html: `<h2>Thank you for your order, ${customerName}!</h2><p>Your order ID is: <strong>${order._id}</strong></p><p>We will contact you at ${phone} to confirm delivery details and payment.</p><p><a href="${process.env.VITE_API_BASE_URL || 'http://localhost:5173'}/track-order">Track your order here</a></p>`,
      });
    }

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

    // Send Status Update Email if email exists
    if (order.email && ['Processing', 'Completed', 'Cancelled'].includes(status)) {
      const msgs = {
        Processing: `Your order is now being processed and packed for shipping!`,
        Completed: `Your order has been completed and dispatched. Thank you for shopping with us!`,
        Cancelled: `Your order has been cancelled.`,
      };
      
      await sendEmail({
        email: order.email,
        subject: `Order Update: ${status} - Nithyam Divyam`,
        html: `<h2>Order Status: ${status}</h2><p>Hi ${order.customerName},</p><p>${msgs[status]}</p><br/><p>Order ID: ${order._id}</p>`,
      });
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

// @desc  Track order (Public)
// @route POST /api/orders/track
const trackOrder = async (req, res, next) => {
  try {
    const { orderId, phone } = req.body;

    if (!orderId || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide both Order ID and Phone Number' });
    }

    const order = await Order.findById(orderId.trim());

    if (!order) {
      return res.status(404).json({ success: false, message: 'No order found with this ID' });
    }

    // Security check: phone must match ignoring spaces/symbols
    const cleanInputPhone = phone.replace(/\D/g, '');
    const cleanDbPhone = order.phone.replace(/\D/g, '');

    // Allow match if original matches, or digits match, to ease customer experience
    if (order.phone !== phone.trim() && cleanInputPhone !== cleanDbPhone) {
      return res.status(401).json({ success: false, message: 'Phone number does not match this order.' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    if (error.name === 'CastError') {
       return res.status(404).json({ success: false, message: 'Invalid Order ID format' });
    }
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, getOrderStats, trackOrder };
