export const orders = [
  {
    id: 'GS-2024-001',
    customer: { name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@example.com', address: 'Village Rampur, Dist. Agra, UP - 282001' },
    items: [
      { productId: 1, name: 'NPK Premium Fertilizer 20-20-20', qty: 5, price: 1299 },
      { productId: 3, name: 'Hybrid Wheat Seeds GS-2024', qty: 2, price: 2499 },
    ],
    total: 11493,
    status: 'delivered',
    date: '2024-11-15',
    paymentMethod: 'UPI',
    notes: 'Please deliver before 10 AM',
  },
  {
    id: 'GS-2024-002',
    customer: { name: 'Priya Sharma', phone: '9765432109', email: 'priya@example.com', address: 'Plot 45, Sector 12, Jaipur, RJ - 302001' },
    items: [
      { productId: 2, name: 'BioShield Organic Pesticide', qty: 3, price: 899 },
      { productId: 11, name: 'Neem Oil Concentrate 10000ppm', qty: 2, price: 750 },
    ],
    total: 4197,
    status: 'processing',
    date: '2024-11-18',
    paymentMethod: 'Cash on Delivery',
    notes: '',
  },
  {
    id: 'GS-2024-003',
    customer: { name: 'Suresh Patel', phone: '9654321098', email: 'suresh@example.com', address: 'Farm House, Anand, Gujarat - 388001' },
    items: [
      { productId: 5, name: 'Drip Irrigation Kit (1 Acre)', qty: 2, price: 8500 },
    ],
    total: 17000,
    status: 'shipped',
    date: '2024-11-19',
    paymentMethod: 'Bank Transfer',
    notes: 'Bulk order - need installation support',
  },
  {
    id: 'GS-2024-004',
    customer: { name: 'Anita Devi', phone: '9543210987', email: 'anita@example.com', address: 'Kisan Colony, Ludhiana, Punjab - 141001' },
    items: [
      { productId: 10, name: 'Urea Fertilizer 46% N', qty: 10, price: 320 },
      { productId: 7, name: 'Fungicide Mancozeb 75% WP', qty: 5, price: 650 },
    ],
    total: 6450,
    status: 'pending',
    date: '2024-11-20',
    paymentMethod: 'UPI',
    notes: '',
  },
  {
    id: 'GS-2024-005',
    customer: { name: 'Mohan Singh', phone: '9432109876', email: 'mohan@example.com', address: 'Village Khanna, Dist. Fatehgarh, UP - 207001' },
    items: [
      { productId: 12, name: 'Paddy/Rice Seeds IR-64', qty: 4, price: 1800 },
      { productId: 6, name: 'Vermicompost Organic Fertilizer', qty: 8, price: 450 },
    ],
    total: 10800,
    status: 'delivered',
    date: '2024-11-10',
    paymentMethod: 'Cash on Delivery',
    notes: '',
  },
  {
    id: 'GS-2024-006',
    customer: { name: 'Kavita Reddy', phone: '9321098765', email: 'kavita@example.com', address: 'Farmers Colony, Hyderabad, TS - 500001' },
    items: [
      { productId: 9, name: 'Soil Testing Kit Professional', qty: 1, price: 2200 },
      { productId: 4, name: 'Professional Sprayer Pump 16L', qty: 2, price: 1850 },
    ],
    total: 5900,
    status: 'cancelled',
    date: '2024-11-12',
    paymentMethod: 'UPI',
    notes: 'Customer requested cancellation',
  },
];

export const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const getStatusColor = (status) => {
  const map = {
    pending: 'yellow',
    processing: 'blue',
    shipped: 'blue',
    delivered: 'green',
    cancelled: 'red',
  };
  return map[status] || 'gray';
};

export const salesData = [
  { month: 'Jun', revenue: 42000, orders: 38, profit: 12600 },
  { month: 'Jul', revenue: 58000, orders: 52, profit: 17400 },
  { month: 'Aug', revenue: 51000, orders: 45, profit: 15300 },
  { month: 'Sep', revenue: 67000, orders: 61, profit: 20100 },
  { month: 'Oct', revenue: 89000, orders: 78, profit: 26700 },
  { month: 'Nov', revenue: 95000, orders: 86, profit: 28500 },
];

export const categoryRevenue = [
  { name: 'Fertilizers', value: 38, color: '#22c55e' },
  { name: 'Seeds', value: 28, color: '#10b981' },
  { name: 'Pesticides', value: 18, color: '#84cc16' },
  { name: 'Tools', value: 9, color: '#f59e0b' },
  { name: 'Irrigation', value: 5, color: '#3b82f6' },
  { name: 'Organic', value: 2, color: '#8b5cf6' },
];
