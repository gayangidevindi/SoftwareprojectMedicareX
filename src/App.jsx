import React, { useState } from 'react';
import { Icons } from './components/Icons';
import PaymentGateway from './components/PaymentGateway';

// Mock Data for "Cart" context
const initialCart = [
  { id: 1, name: "Consultation Fee", price: 1500, quantity: 1 },
  { id: 2, name: "Prescription Medicine", price: 3250, quantity: 1 },
];

const pharmacyBranches = [
  { id: 1, district: "Colombo", name: "Colombo 7 - Cinnamon Gardens", address: "15, Maitland Place, Colombo 07" },
  { id: 2, district: "Colombo", name: "Wellawatte", address: "234 Galle Road, Colombo 06" },
  { id: 3, district: "Gampaha", name: "Gampaha City Center", address: "22, Kandy Road, Gampaha" },
  { id: 4, district: "Kandy", name: "Kandy City", address: "54, Dalada Veediya, Kandy" },
];

const sriLankaDistricts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Galle", "Matara", "Jaffna", "Kurunegala"
];

function App() {
  // State for Payment & Checkout
  const [cart] = useState(initialCart);
  const [deliveryMethod, setDeliveryMethod] = useState("Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Card"); // Default to Card/PayHere
  const [bankSlip, setBankSlip] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '', phone: '', address: '', city: '', district: '', postalCode: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Derived State
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryCharge = deliveryMethod === "Delivery" ? 350 : 0;
  const finalTotal = cartTotal + deliveryCharge;

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleBranchChange = (e) => {
    const branchId = parseInt(e.target.value);
    const branch = pharmacyBranches.find(b => b.id === branchId);
    setSelectedBranch(branch);
  };

  const handleBankSlipChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setBankSlip(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const initiateOrder = () => {
    // Validation
    if (deliveryMethod === "Delivery") {
      if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
        alert("Please fill in all delivery details.");
        return;
      }
    } else if (deliveryMethod === "Pickup" && !selectedBranch) {
      alert("Please select a pickup branch.");
      return;
    }

    if (paymentMethod === "Bank" && !bankSlip) {
      alert("Please upload the bank transfer slip.");
      return;
    }

    setIsProcessing(true);

    // Simulate API Call
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      setOrderPlaced({
        id: orderId,
        total: finalTotal,
        method: paymentMethod,
        delivery: deliveryMethod,
      });
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Icons.Check />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-8">Your order has been confirmed.</p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-left space-y-3 mb-6">
            <div className="flex justify-between"><span className="text-gray-500">Order ID</span><span className="font-bold">{orderPlaced.id}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Amount Paid</span><span className="font-bold text-green-600">Rs. {orderPlaced.total}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Payment Method</span><span className="font-medium">{orderPlaced.method}</span></div>
          </div>

          <button onClick={() => window.location.reload()} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: INFORMATION & PAYMENT */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white"><Icons.CreditCard /></div>
            <h1 className="text-2xl font-bold text-gray-800">Secure Checkout</h1>
          </div>

          {/* 1. Delivery Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Icons.Truck /> Delivery Details</h3>

            {/* Method Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div onClick={() => setDeliveryMethod("Delivery")} className={`p-4 border rounded-xl cursor-pointer text-center transition-all ${deliveryMethod === 'Delivery' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}>
                <p className="font-bold text-gray-800">Home Delivery</p>
                <p className="text-xs text-gray-500">Rs. 350</p>
              </div>
              <div onClick={() => setDeliveryMethod("Pickup")} className={`p-4 border rounded-xl cursor-pointer text-center transition-all ${deliveryMethod === 'Pickup' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}>
                <p className="font-bold text-gray-800">Store Pickup</p>
                <p className="text-xs text-green-600 font-bold">Free</p>
              </div>
            </div>

            {/* Form Fields */}
            {deliveryMethod === "Delivery" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                  <input name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                  <input name="address" value={shippingInfo.address} onChange={handleShippingChange} className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                  <input name="city" value={shippingInfo.city} onChange={handleShippingChange} className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">District</label>
                  <select name="district" value={shippingInfo.district} onChange={handleShippingChange} className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition">
                    <option value="">Select District</option>
                    {sriLankaDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                  <input name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Pickup Branch</label>
                <select onChange={handleBranchChange} className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition mb-4">
                  <option value="">Select a nearby branch</option>
                  {pharmacyBranches.map(b => <option key={b.id} value={b.id}>{b.district} - {b.name}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* 2. Payment Gateway Component */}
          <PaymentGateway
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            deliveryMethod={deliveryMethod}
            bankSlip={bankSlip}
            handleBankSlipChange={handleBankSlipChange}
          />
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-6">
            <h4 className="font-bold text-xl text-gray-800 mb-6">Order Summary</h4>

            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-gray-600">{item.quantity}</span>
                    <span className="text-gray-700 truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span className="font-medium">Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed my-4"></div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>Rs. {cartTotal}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={deliveryMethod === "Pickup" ? "text-green-600 font-bold" : ""}>{deliveryMethod === "Delivery" ? "Rs. 350" : "Free"}</span>
              </div>
              <div className="flex justify-between font-bold text-2xl text-blue-600 pt-2"><span>Total</span><span>Rs. {finalTotal}</span></div>
            </div>

            <button
              onClick={initiateOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? "Processing..." : `Pay Rs. ${finalTotal}`}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Icons.LockClosed /> Secured by PayHere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;