const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus, getOrderStats, trackOrder } = require('../controllers/orderController');

// Public route for order tracking
router.post('/track', trackOrder);

router.route('/')
  .post(createOrder)
  .get(getOrders); // In production, add admin auth middleware mapping here

router.get('/stats', getOrderStats);

router.route('/:id')
  .get(getOrderById)
  .put(updateOrderStatus);

module.exports = router;
