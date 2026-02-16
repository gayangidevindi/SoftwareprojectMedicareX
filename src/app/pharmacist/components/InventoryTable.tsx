export default function InventoryTable({ items }: { items: any[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-teal-600 to-emerald-600">
            <th className="px-6 py-4 text-left text-xs font-semibold tracking-widest text-white uppercase">
              Product
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold tracking-widest text-white uppercase">
              Stock
            </th>
            <th className="px-6 py-4 text-center text-xs font-semibold tracking-widest text-white uppercase">
              Expiry Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr
              key={item.id}
              className={`transition-colors duration-150 ${
                item.stock <= 10 ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-slate-50'
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {item.stock <= 10 && (
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                  <span className={`text-sm font-medium ${item.stock <= 10 ? 'text-red-700' : 'text-slate-800'}`}>
                    {item.name}
                  </span>
                  {item.stock <= 10 && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                      Low Stock
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-bold ${
                  item.stock <= 10
                    ? 'bg-red-100 text-red-700'
                    : item.stock <= 30
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {item.stock}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm text-slate-500 font-mono">
                  {new Date(item.expiryDate.seconds * 1000).toDateString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="py-16 text-center text-slate-400 text-sm">No inventory items found.</div>
      )}
    </div>
  );
}