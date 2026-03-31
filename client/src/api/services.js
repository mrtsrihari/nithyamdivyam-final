import api from './axios';

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);

export const placeOrder = (orderData) => api.post('/orders', orderData);
export const fetchOrders = () => api.get('/orders');
export const fetchOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });
export const fetchOrderStats = () => api.get('/orders/stats');
