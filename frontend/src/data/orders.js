const orders = [
  { id: "#1001", customer: "Ayesha Raza", email: "ayesha.raza@gmail.com", phone: "0300 1234567", address: "House 12, Street 4, DHA Phase 5, Lahore", date: "2026-07-08", items: [{ name: "Crochet Bouquet", qty: 1, price: 2500 }, { name: "Heart Keychain", qty: 2, price: 650 }], paymentMethod: "Cash on Delivery", status: "Pending" },
  { id: "#1002", customer: "Fatima Noor", email: "fatima.noor@gmail.com", phone: "0311 2223344", address: "Flat 3B, Bahria Town, Karachi", date: "2026-07-07", items: [{ name: "Sunflower Bouquet", qty: 1, price: 2800 }], paymentMethod: "EasyPaisa", status: "Delivered" },
  { id: "#1003", customer: "Sara Ahmed", email: "sara.ahmed@gmail.com", phone: "0322 5556677", address: "House 7, Model Town, Gujrat", date: "2026-07-06", items: [{ name: "Crochet Bunny", qty: 1, price: 1800 }, { name: "Rose Bouquet", qty: 1, price: 3200 }], paymentMethod: "JazzCash", status: "Shipped" },
  { id: "#1004", customer: "Mahnoor Iqbal", email: "mahnoor.iqbal@gmail.com", phone: "0333 7778899", address: "Street 9, G-11, Islamabad", date: "2026-07-05", items: [{ name: "Custom Gift Box", qty: 1, price: 4500 }], paymentMethod: "Bank Transfer", status: "Processing" },
  { id: "#1005", customer: "Zainab Malik", email: "zainab.malik@gmail.com", phone: "0345 1112233", address: "House 21, Satellite Town, Gujrat", date: "2026-07-03", items: [{ name: "Mini Flower Pot", qty: 3, price: 1400 }], paymentMethod: "Cash on Delivery", status: "Cancelled" },
];

export default orders;
