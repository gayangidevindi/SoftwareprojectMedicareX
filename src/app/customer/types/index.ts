export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: 'medicine' | 'baby' | 'skincare' | 'equipment';
  imageUrl: string;
  requiresPrescription: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'online' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  orderId: string;
  customerId: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
  }>;
  prescriptionUrls?: string[];
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  totalAmount: number;
  deliveryFee: number;
  orderDate: Date;
  estimatedDelivery?: Date;
}