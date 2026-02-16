interface Props {
  order: any;
  onDeliver: () => void;
}

export default function OrderRow({ order, onDeliver }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between">
      <div>
        <p className="font-semibold">{order.customerName}</p>
        <p className="text-sm">Total: Rs. {order.total}</p>
        <p className="text-sm">Payment: {order.paymentMethod}</p>
        <p className="text-sm">Status: {order.status}</p>
      </div>

      {order.status === 'pending' && (
        <button
          onClick={onDeliver}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Mark Delivered
        </button>
      )}
    </div>
  );
}
