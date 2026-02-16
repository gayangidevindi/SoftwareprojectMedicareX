import React from 'react';
import { Icons } from './Icons';

const PaymentGateway = ({
    paymentMethod,
    setPaymentMethod,
    deliveryMethod,
    bankSlip,
    handleBankSlipChange
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white flex items-center gap-2">
                <Icons.CreditCard /> <h3 className="text-lg font-bold">Payment Method</h3>
            </div>
            <div className="p-6 space-y-4">
                {/* PayHere - New Logo */}
                <div onClick={() => setPaymentMethod("PayHere")} className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'PayHere' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'}`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'PayHere' ? 'border-blue-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'PayHere' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                    </div>
                    <Icons.PayHereLogo />
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">PayHere</p>
                        <p className="text-sm text-gray-500">Pay with Visa, MasterCard, or local bank cards</p>
                    </div>
                    {/* Right Side Icons - Full Opacity */}
                    <div className="flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-5" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-5" />
                    </div>
                </div>

                {/* Stripe - Expandable */}
                <div onClick={() => setPaymentMethod("Card")} className={`p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'Card' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4 mb-2">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Card' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {paymentMethod === 'Card' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <Icons.StripeLogo />
                        <div className="flex-1">
                            <p className="font-bold text-gray-800">Credit / Debit Card (Stripe)</p>
                            <p className="text-sm text-gray-500">Secure payment with international cards</p>
                        </div>
                        {/* Right Side Icons - Full Opacity */}
                        <div className="flex gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-5" />
                        </div>
                    </div>
                    {paymentMethod === 'Card' && (
                        <div className="mt-4 pt-4 border-t border-blue-100 grid grid-cols-2 gap-3 animate-fadeIn">
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
                                <div className="relative">
                                    <input placeholder="0000 0000 0000 0000" className="w-full p-2 border rounded bg-white pr-24" />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 pointer-events-none opacity-60">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-5" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-5" />
                                    </div>
                                </div>
                            </div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">Expiry</label><input placeholder="MM/YY" className="w-full p-2 border rounded bg-white" /></div>
                            <div><label className="text-xs font-bold text-gray-500 uppercase">CVC</label><input placeholder="123" className="w-full p-2 border rounded bg-white" /></div>
                        </div>
                    )}
                </div>

                {/* Bank Transfer - EXPANDABLE SECTION ADDED HERE */}
                <div onClick={() => setPaymentMethod("Bank")} className={`p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'Bank' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-4 mb-2">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Bank' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {paymentMethod === 'Bank' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <Icons.BankLogo />
                        <div>
                            <p className="font-bold text-gray-800 flex items-center gap-2">Bank Transfer <span className="text-xs text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded-full">Manual</span></p>
                            <p className="text-sm text-gray-500">Direct bank transfer to our account</p>
                        </div>
                    </div>

                    {/* EXPANDED BANK DETAILS & UPLOAD */}
                    {paymentMethod === 'Bank' && (
                        <div className="mt-4 pt-4 border-t border-blue-100 animate-fadeIn">
                            <div className="bg-white p-3 rounded-lg border border-blue-200 mb-4 text-sm text-gray-700 space-y-1">
                                <p><span className="font-semibold">Bank:</span> Bank of Ceylon</p>
                                <p><span className="font-semibold">Account No:</span> 85674523120</p>
                                <p><span className="font-semibold">Name:</span> Medicare Pharmacy (Pvt) Ltd</p>
                                <p><span className="font-semibold">Branch:</span> Colombo Main Branch</p>
                            </div>
                            <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center bg-blue-50 hover:bg-blue-100 transition cursor-pointer relative">
                                <input type="file" accept="image/*" onChange={handleBankSlipChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                {bankSlip ? (
                                    <div className="text-green-600 font-bold flex items-center justify-center gap-2"><Icons.Check /> Slip Uploaded</div>
                                ) : (
                                    <div className="text-blue-600 text-sm font-semibold flex flex-col items-center">
                                        <Icons.Upload />
                                        <span>Click to Upload Transfer Slip</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* COD - Existing Logo */}
                {deliveryMethod === 'Delivery' && (
                    <div onClick={() => setPaymentMethod("COD")} className={`p-4 border rounded-xl cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-blue-600' : 'border-gray-300'}`}>
                            {paymentMethod === 'COD' && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
                        </div>
                        <Icons.CODLogo />
                        <div>
                            <p className="font-bold text-gray-800">Cash on Delivery (COD)</p>
                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentGateway;
