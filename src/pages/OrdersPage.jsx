import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const steps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const statusStep = {
  processing: 1,
  shipped: 2,
  out_for_delivery: 3,
  delivered: 4,
};

const statusColor = {
  processing: { bg: 'rgba(168,85,61,0.1)', text: '#A8553D', label: 'Processing' },
  shipped: { bg: 'rgba(45,42,38,0.08)', text: '#2D2A26', label: 'Shipped' },
  out_for_delivery: { bg: 'rgba(201,111,74,0.12)', text: '#C96F4A', label: 'Out for Delivery' },
  delivered: { bg: 'rgba(168,85,61,0.08)', text: '#A8553D', label: 'Delivered ✓' },
};

function OrderTracker({ status }) {
  const current = statusStep[status] ?? 0;
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 z-0" style={{ background: '#E8DCC8' }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${(current / (steps.length - 1)) * 100}%`, background: '#A8553D' }}
          />
        </div>
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2 z-10 flex-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: i <= current ? '#A8553D' : '#E8DCC8',
                border: i === current ? '3px solid #C96F4A' : 'none',
              }}
            >
              {i < current ? (
                <i className="ti ti-check" style={{ fontSize: '13px', color: '#FBF8F3' }} />
              ) : i === current ? (
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FBF8F3' }} />
              ) : (
                <div className="w-2 h-2 rounded-full" style={{ background: '#9A948D' }} />
              )}
            </div>
            <span
              className="font-body text-[9px] uppercase tracking-wide text-center leading-tight hidden md:block"
              style={{ color: i <= current ? '#A8553D' : '#9A948D', fontWeight: i <= current ? 700 : 400 }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersPage() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tt_orders') || '[]');
    if (stored.length > 0) {
      setOrders(stored);
    } else {
      setOrders([
        {
          id: "TT-2026-001",
          date: "June 20, 2026",
          status: "delivered",
          items: [{ name: "Wrap Maxi Dress", price: 99, img: "https://i.pinimg.com/736x/a6/e8/1a/a6e81a5cb8a90a7d87b4349deba65024.jpg" }],
          total: 99,
          address: "123 Summer Ave, Karachi",
          customer: "Sara Ahmed",
          email: "sara@email.com",
        },
        {
          id: "TT-2026-002",
          date: "June 23, 2026",
          status: "shipped",
          items: [{ name: "Silk Blouse", price: 65, img: "https://i.pinimg.com/736x/e7/2c/2b/e72c2bd53f63c05fe854680d2155c8c6.jpg" }],
          total: 65,
          address: "456 Fashion St, Lahore",
          customer: "Aisha Khan",
          email: "aisha@email.com",
        },
      ]);
    }
  }, []);

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen bg-cream">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#F5F0E8' }}>
          <i className="ti ti-lock" style={{ fontSize: '32px', color: '#A8553D' }} />
        </div>
        <h1 className="font-display font-black text-3xl uppercase text-charcoal mb-4">Please Log In</h1>
        <p className="text-charcoal/60 mb-8 font-body">You need to be logged in to view your orders.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full"
          style={{ background: '#A8553D', padding: '13px 24px' }}
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <p className="font-body text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#C96F4A' }}>
            My Account
          </p>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
            My Orders
          </h1>
          <p className="font-body text-sm text-charcoal/50 mt-2">{orders.length} orders found</p>
        </div>

        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl overflow-hidden"
              style={{ border: '1.5px solid #E8DCC8' }}
            >
              <div
                className="px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                style={{ background: '#F5F0E8' }}
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 2).map((item, i) => (
                      <img key={i} src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-cream" />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="font-body font-bold text-xs text-charcoal uppercase tracking-wide">{order.id}</p>
                    <p className="font-body text-xs text-charcoal/50 mt-0.5">{order.date} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="px-3 py-1 rounded-full font-body font-bold text-[10px] uppercase tracking-wide"
                    style={{ background: statusColor[order.status]?.bg, color: statusColor[order.status]?.text }}
                  >
                    {statusColor[order.status]?.label}
                  </span>
                  <span className="font-display font-black text-charcoal text-sm">${order.total}</span>
                  <i
                    className={`ti ${expanded === order.id ? 'ti-chevron-up' : 'ti-chevron-down'}`}
                    style={{ fontSize: '16px', color: '#9A948D' }}
                  />
                </div>
              </div>

              {expanded === order.id && (
                <div className="px-6 py-5 bg-cream">
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-3">Order Tracker</p>
                  <OrderTracker status={order.status} />

                  <div className="mt-6 flex flex-col gap-3">
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-charcoal/50">Items</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-2xl p-3" style={{ background: '#F5F0E8' }}>
                        <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-body font-bold text-sm text-charcoal">{item.name}</p>
                        </div>
                        <p className="font-body font-bold text-sm flex-shrink-0" style={{ color: '#A8553D' }}>${item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl p-4" style={{ background: '#F5F0E8' }}>
                      <p className="font-body text-[10px] font-bold uppercase tracking-wide text-charcoal/40 mb-1">Deliver To</p>
                      <p className="font-body text-sm text-charcoal">{order.address}</p>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: '#F5F0E8' }}>
                      <p className="font-body text-[10px] font-bold uppercase tracking-wide text-charcoal/40 mb-1">Order Total</p>
                      <p className="font-display font-black text-lg text-charcoal">${order.total}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Link
                      to="/shop"
                      className="flex-1 inline-flex items-center justify-center font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full py-3 transition-all duration-200 hover:opacity-90"
                      style={{ background: '#A8553D' }}
                    >
                      Buy Again
                    </Link>
                    <Link
                      to="/contact"
                      className="flex-1 inline-flex items-center justify-center font-body font-bold text-xs uppercase tracking-widest text-charcoal rounded-full py-3 transition-all duration-200 hover:bg-sand"
                      style={{ border: '1.5px solid #E8DCC8' }}
                    >
                      Need Help?
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;