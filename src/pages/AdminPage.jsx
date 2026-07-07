
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { products as allProducts } from "../data/products";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const statusOptions = ["processing", "shipped", "out_for_delivery", "delivered"];

const statusColor = {
  processing: { bg: '#FEF3C7', text: '#D97706', label: 'Processing' },
  shipped:    { bg: '#DBEAFE', text: '#2563EB', label: 'Shipped' },
  out_for_delivery: { bg: '#EDE9FE', text: '#7C3AED', label: 'Out for Delivery' },
  delivered:  { bg: '#DCFCE7', text: '#16A34A', label: 'Delivered ✓' },
  cancelled:  { bg: '#FEE2E2', text: '#DC2626', label: 'Cancelled' },
};

function DonutChart({ segments, size = 160 }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  const r = 32;
  const cx = 50;
  const cy = 50;
  const strokeW = 16;

  if (total === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F5F0E8" strokeWidth={strokeW} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize="9" fill="#9A948D">No data</text>
      </svg>
    );
  }

  const visible = segments.filter(s => s.value > 0);
  const gapDeg = visible.length > 1 ? 3 : 0;
  let cumulativeDeg = -90;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F5F0E8" strokeWidth={strokeW} />
      {visible.map((seg, i) => {
        const segDeg = (seg.value / total) * 360;
        const startDeg = cumulativeDeg;
        const endDeg = cumulativeDeg + segDeg - gapDeg;
        cumulativeDeg += segDeg;

        const startRad = (startDeg * Math.PI) / 180;
        const endRad = (endDeg * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const largeArc = (endDeg - startDeg) > 180 ? 1 : 0;

        return (
          <path
            key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="900" fontSize="20" fill="#2D2A26">{total}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="'Outfit',sans-serif" fontSize="6.5" fontWeight="700" fill="#9A948D" letterSpacing="1">ORDERS</text>
    </svg>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-4 h-56">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <span className="font-body font-black text-sm" style={{ color: d.color }}>${d.value}</span>
            <div className="w-full rounded-2xl relative overflow-hidden" style={{ height: '180px', background: '#F5F0E8' }}>
              <div
                className="absolute bottom-0 left-0 right-0 rounded-2xl transition-all duration-700"
                style={{ height: `${Math.max((d.value / max) * 100, 4)}%`, background: `linear-gradient(180deg, ${d.color}, ${d.color}cc)` }}
              />
            </div>
            <span className="font-body text-[10px] font-bold text-charcoal/40 text-center">{d.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-1" style={{ borderTop: '1px solid #EDE8E3' }}>
        <span className="font-body text-[10px] font-bold text-charcoal/30">$0</span>
        <span className="font-body text-[10px] font-bold text-charcoal/30">${max}</span>
      </div>
    </div>
  );
}

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab,    setActiveTab]    = useState("dashboard");
  const [orders,       setOrders]       = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expanded,     setExpanded]     = useState(null);
  const [saved,        setSaved]        = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [notification, setNotification] = useState(null);

  const isAdmin = user && user.email === "admin@terrathread.com";

  useEffect(() => {
    if (!isAdmin) {
      setOrdersLoading(false);
      return;
    }
    fetchAllOrders();
  }, [isAdmin]);

  const fetchAllOrders = async () => {
    setOrdersLoading(true);
    try {
      const snap = await getDocs(collection(db, "orders"));
      const fetched = snap.docs.map((d) => d.data());
      fetched.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setOrders(fetched);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    }
    setOrdersLoading(false);
  };

  if (!user || user.email !== "admin@terrathread.com") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F0E0D' }}>
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(168,85,61,0.12)', border: '1px solid rgba(168,85,61,0.25)' }}>
            <i className="ti ti-shield-off" style={{ fontSize: '32px', color: '#A8553D' }} />
          </div>
          <h1 className="font-display font-black text-3xl uppercase mb-3" style={{ color: '#FBF8F3' }}>Access Denied</h1>
          <p className="font-body text-sm mb-8" style={{ color: 'rgba(251,248,243,0.4)' }}>Login with admin@terrathread.com</p>
          <button onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 font-body font-bold text-xs uppercase tracking-widest rounded-full px-6 py-3 cursor-pointer"
            style={{ background: '#A8553D', color: '#FBF8F3' }}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "orders", id), { status });
      setOrders((prev) => prev.map(o => o.id === id ? { ...o, status } : o));
      setSaved(id); setTimeout(() => setSaved(null), 2000);
      showNotif(`${id} → ${status.replace(/_/g, ' ')}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      showNotif("Failed to update order", "error");
    }
  };

  const cancelOrder = async (id) => {
    try {
      await updateDoc(doc(db, "orders", id), { status: "cancelled" });
      setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o));
      showNotif(`Order ${id} cancelled`, 'error');
    } catch (err) {
      console.error("Failed to cancel order:", err);
      showNotif("Failed to cancel order", "error");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      setOrders((prev) => prev.filter(o => o.id !== id));
      setExpanded(null);
      showNotif(`Order ${id} deleted`, 'error');
    } catch (err) {
      console.error("Failed to delete order:", err);
      showNotif("Failed to delete order", "error");
    }
  };

  const totalRevenue     = orders.reduce((s, o) => s + o.total, 0);
  const processingCount  = orders.filter(o => o.status === 'processing').length;
  const deliveredCount   = orders.filter(o => o.status === 'delivered').length;
  const shippedCount     = orders.filter(o => o.status === 'shipped').length;
  const cancelledCount   = orders.filter(o => o.status === 'cancelled').length;
  const outCount         = orders.filter(o => o.status === 'out_for_delivery').length;
  const customers        = [...new Map(orders.map(o => [o.email, o])).values()];

  const filteredOrders = orders.filter(o => {
    const ms = filterStatus === 'all' || o.status === filterStatus;
    const mq = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
               o.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
               o.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return ms && mq;
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ti-layout-dashboard' },
    { id: 'orders',    label: 'Orders',    icon: 'ti-shopping-bag', count: processingCount },
    { id: 'products',  label: 'Products',  icon: 'ti-hanger' },
    { id: 'customers', label: 'Customers', icon: 'ti-users' },
  ];

  const bg   = '#F7F5F2';
  const card = '#FFFFFF';
  const bdr  = '#EDE8E3';
  const dark = '#18171A';

  if (ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: bg }}>
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: bdr, borderTopColor: '#A8553D' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: bg }}>

      {notification && (
        <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
          style={{ background: dark, border: `1px solid ${notification.type === 'error' ? 'rgba(220,38,38,0.3)' : 'rgba(22,163,74,0.3)'}`, color: '#FBF8F3' }}>
          <i className={`ti ${notification.type === 'error' ? 'ti-alert-circle' : 'ti-circle-check'}`}
            style={{ fontSize: '18px', color: notification.type === 'error' ? '#DC2626' : '#16A34A' }} />
          <p className="font-body text-sm font-bold">{notification.msg}</p>
        </div>
      )}

      <aside className="w-56 flex-shrink-0 hidden lg:flex flex-col fixed top-0 left-0 h-screen z-20" style={{ background: dark }}>
        <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#A8553D' }}>
            <svg width="18" height="18" viewBox="0 0 28 28">
              <text x="14" y="21" textAnchor="middle" fontFamily="'Playfair Display',serif" fontWeight="700" fontSize="18" fill="#FBF8F3">T</text>
            </svg>
          </div>
          <div>
            <p className="font-display font-bold text-sm leading-none" style={{ color: '#FBF8F3' }}>TerraThread</p>
            <p className="font-body text-[9px] uppercase tracking-widest" style={{ color: '#A8553D' }}>Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer w-full text-left transition-all duration-150"
              style={{ background: activeTab === tab.id ? 'rgba(168,85,61,0.18)' : 'transparent', color: activeTab === tab.id ? '#C96F4A' : 'rgba(255,255,255,0.38)', border: `1px solid ${activeTab === tab.id ? 'rgba(168,85,61,0.28)' : 'transparent'}` }}>
              <i className={`ti ${tab.icon}`} style={{ fontSize: '17px' }} />
              <span className="font-body font-semibold text-sm">{tab.label}</span>
              {tab.count > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: '#A8553D', color: '#FBF8F3' }}>{tab.count}</span>
              )}
            </button>
          ))}

          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <i className="ti ti-home" style={{ fontSize: '17px' }} />
              <span className="font-body font-semibold text-sm">View Store</span>
            </Link>
          </div>
        </nav>

        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#A8553D', color: '#FBF8F3' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-bold text-xs truncate" style={{ color: '#FBF8F3' }}>{user.name}</p>
              <p className="font-body text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>Administrator</p>
            </div>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#16A34A', boxShadow: '0 0 5px #16A34A' }} />
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-56 flex flex-col">

        <header className="sticky top-0 z-10 px-6 md:px-8 py-4 flex items-center justify-between"
          style={{ background: 'rgba(247,245,242,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${bdr}` }}>
          <div>
            <h1 className="font-display font-black text-lg uppercase text-charcoal capitalize">{activeTab}</h1>
            <p className="font-body text-xs mt-0.5" style={{ color: '#9A948D' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-2 lg:hidden">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="p-2 rounded-xl cursor-pointer"
                style={{ background: activeTab === tab.id ? '#A8553D' : bdr, color: activeTab === tab.id ? '#FBF8F3' : '#2D2A26' }}>
                <i className={`ti ${tab.icon}`} style={{ fontSize: '16px' }} />
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 px-6 md:px-8 py-8">

          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-6">

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue",  value: `$${totalRevenue.toFixed(0)}`, icon: "ti-coin",          sub: "All time",          accent: '#A8553D' },
                  { label: "Total Orders",   value: orders.length,                 icon: "ti-shopping-bag",  sub: `${processingCount} pending`, accent: '#2563EB' },
                  { label: "Delivered",      value: deliveredCount,                icon: "ti-circle-check",  sub: `${shippedCount} shipped`,    accent: '#16A34A' },
                  { label: "Customers",      value: customers.length,              icon: "ti-users",         sub: "Unique buyers",     accent: '#7C3AED' },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: card, border: `1px solid ${bdr}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.accent}14` }}>
                        <i className={`ti ${s.icon}`} style={{ fontSize: '18px', color: s.accent }} />
                      </div>
                      <span className="font-body text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: '#F5F0E8', color: '#9A948D' }}>{s.sub}</span>
                    </div>
                    <p className="font-display font-black text-3xl text-charcoal leading-none">{s.value}</p>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wide mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">

                <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: card, border: `1px solid ${bdr}` }}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-body font-bold text-xs uppercase tracking-widest text-charcoal/40">Order Status</h3>
                    <span className="font-body text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: '#F5F0E8', color: '#A8553D' }}>Live</span>
                  </div>

                  <div className="flex flex-col items-center gap-5">
                    <DonutChart size={160} segments={[
                      { value: processingCount,  color: '#D97706' },
                      { value: shippedCount,     color: '#2563EB' },
                      { value: outCount,         color: '#7C3AED' },
                      { value: deliveredCount,   color: '#16A34A' },
                      { value: cancelledCount,   color: '#DC2626' },
                    ]} />

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full">
                      {[
                        { label: 'Processing',  count: processingCount, color: '#D97706' },
                        { label: 'Shipped',     count: shippedCount,    color: '#2563EB' },
                        { label: 'Delivering',  count: outCount,        color: '#7C3AED' },
                        { label: 'Delivered',   count: deliveredCount,  color: '#16A34A' },
                        { label: 'Cancelled',   count: cancelledCount,  color: '#DC2626' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                          <span className="font-body text-[11px] text-charcoal/60 flex-1 truncate">{item.label}</span>
                          <span className="font-body font-black text-[11px] text-charcoal">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-6" style={{ background: card, border: `1px solid ${bdr}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-body font-bold text-xs uppercase tracking-widest text-charcoal/40">Order Values</h3>
                   <span className="font-body text-[10px] font-bold px-2 py-1 rounded-lg" style={{ background: '#F5F0E8', color: '#A8553D' }}>
  Total ${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}
</span>
                  </div>
                  <BarChart data={orders.slice(0, 5).map((o, i) => ({
                    label: `#${i + 1}`,
                    value: o.total,
                    color: ['#A8553D','#2563EB','#16A34A','#D97706','#7C3AED','#C96F4A'][i % 6],
                  }))} />
                </div>

                <div className="rounded-2xl p-6" style={{ background: card, border: `1px solid ${bdr}` }}>
                  <h3 className="font-body font-bold text-xs uppercase tracking-widest text-charcoal/40 mb-4">Top Products</h3>
                  <div className="flex flex-col gap-3">
                    {allProducts.slice(0, 5).map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="font-body font-black text-xs w-4 text-charcoal/20">{i + 1}</span>
                        <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-bold text-xs text-charcoal truncate">{p.name}</p>
                          <p className="font-body text-[10px] text-charcoal/40">{p.category}</p>
                        </div>
                        <p className="font-body font-black text-sm flex-shrink-0" style={{ color: '#A8553D' }}>${p.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden" style={{ background: card, border: `1px solid ${bdr}` }}>
                <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${bdr}` }}>
                  <h3 className="font-body font-bold text-xs uppercase tracking-widest text-charcoal/40">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="font-body text-xs font-bold cursor-pointer hover:opacity-70" style={{ color: '#A8553D' }}>
                    View all →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ background: '#FAFAF9' }}>
                        {["Order", "Customer", "Status", "Total", "Date"].map((h, hi) => (
  <th key={h} className={`px-5 py-3 text-left font-body font-bold text-[10px] uppercase tracking-widest text-charcoal/30 ${hi >= 4 ? 'hidden md:table-cell' : ''}`}>{h}</th>
))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((o, i) => (
                        <tr key={o.id} style={{ borderTop: `1px solid ${bdr}` }}>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <img src={o.items[0]?.img} alt="" className="w-8 h-8 rounded-lg object-cover" />
                              <span className="font-body font-bold text-xs text-charcoal">{o.id}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-body text-xs text-charcoal/60">{o.customer}</td>
                          <td className="px-5 py-3.5">
                            <span className="px-2.5 py-1 rounded-full font-body font-bold text-[10px] uppercase" style={{ background: statusColor[o.status]?.bg, color: statusColor[o.status]?.text }}>
                              {statusColor[o.status]?.label}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-display font-black text-sm text-charcoal">${o.total}</td>
                          <td className="px-5 py-3.5 font-body text-xs text-charcoal/50 hidden md:table-cell">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" style={{ fontSize: '15px' }} />
                  <input type="text" placeholder="Search by ID, customer, email..."
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl font-body text-sm text-charcoal outline-none"
                    style={{ background: card, border: `1px solid ${bdr}` }} />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all','processing','shipped','out_for_delivery','delivered','cancelled'].map(s => (
                    <button key={s} onClick={() => setFilterStatus(s)}
                      className="px-3 py-2 rounded-xl font-body font-bold text-[10px] uppercase tracking-wide cursor-pointer transition-all"
                      style={{ background: filterStatus === s ? '#A8553D' : card, color: filterStatus === s ? '#FBF8F3' : '#2D2A26', border: `1px solid ${filterStatus === s ? '#A8553D' : bdr}` }}>
                      {s === 'all' ? 'All' : s.replace(/_/g,' ')}
                    </button>
                  ))}
                </div>
              </div>

              <p className="font-body text-xs text-charcoal/40">{filteredOrders.length} orders</p>

              <div className="rounded-2xl overflow-hidden" style={{ background: card, border: `1px solid ${bdr}` }}>
                {filteredOrders.length === 0 && (
                  <div className="py-16 text-center">
                    <i className="ti ti-shopping-bag" style={{ fontSize: '32px', color: '#E8DCC8' }} />
                    <p className="font-body text-sm text-charcoal/40 mt-3">No orders found</p>
                  </div>
                )}
                {filteredOrders.map((order, idx) => (
                  <div key={order.id} style={{ borderTop: idx > 0 ? `1px solid ${bdr}` : 'none' }}>
                    <div className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                      <img src={order.items[0]?.img} alt="" className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-body font-black text-xs text-charcoal uppercase">{order.id}</p>
                          <span className="px-2 py-0.5 rounded-full font-body font-bold text-[9px] uppercase"
                            style={{ background: statusColor[order.status]?.bg, color: statusColor[order.status]?.text }}>
                            {statusColor[order.status]?.label}
                          </span>
                        </div>
                        <p className="font-body text-xs text-charcoal/50">{order.customer} · {order.email}</p>
                      </div>
                      <p className="font-display font-black text-sm text-charcoal hidden md:block">${order.total}</p>
                      <p className="font-body text-xs text-charcoal/40 hidden md:block">{order.date}</p>
                      <i className={`ti ${expanded === order.id ? 'ti-chevron-up' : 'ti-chevron-down'} text-charcoal/30`} style={{ fontSize: '16px' }} />
                    </div>

                    {expanded === order.id && (
                      <div className="px-5 pb-5 pt-4 flex flex-col gap-5" style={{ borderTop: `1px solid ${bdr}`, background: '#FAFAF9' }}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            { label: "Customer", value: order.customer },
                            { label: "Email",    value: order.email },
                            { label: "Phone",    value: order.phone || 'N/A' },
                            { label: "Address",  value: order.address },
                            { label: "Items",    value: `${order.items.length} item${order.items.length > 1 ? 's' : ''}` },
                            { label: "Total",    value: `$${order.total}` },
                          ].map((item, i) => (
                            <div key={i} className="rounded-xl p-3" style={{ background: card, border: `1px solid ${bdr}` }}>
                              <p className="font-body text-[10px] font-bold uppercase tracking-wide text-charcoal/30 mb-1">{item.label}</p>
                              <p className="font-body text-sm font-bold text-charcoal truncate">{item.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="font-body text-[10px] font-bold uppercase tracking-wide text-charcoal/30">Items</p>
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: card, border: `1px solid ${bdr}` }}>
                              <img src={item.img} alt={item.name} className="w-11 h-11 rounded-lg object-cover" />
                              <p className="font-body font-bold text-sm text-charcoal flex-1">{item.name}</p>
                              <p className="font-body font-bold text-sm" style={{ color: '#A8553D' }}>${item.price}</p>
                            </div>
                          ))}
                        </div>

                        <div>
                          <p className="font-body text-[10px] font-bold uppercase tracking-wide text-charcoal/30 mb-3">Update Status</p>
                          <div className="flex gap-2 flex-wrap">
                            {statusOptions.map(s => (
                              <button key={s} onClick={() => updateStatus(order.id, s)}
                                className="px-4 py-2 rounded-xl font-body font-bold text-[10px] uppercase tracking-wide cursor-pointer transition-all"
                                style={{ background: order.status === s ? '#A8553D' : card, color: order.status === s ? '#FBF8F3' : '#2D2A26', border: `1px solid ${order.status === s ? '#A8553D' : bdr}` }}>
                                {s === 'out_for_delivery' ? 'Out for Delivery' : s.charAt(0).toUpperCase() + s.slice(1)}
                              </button>
                            ))}
                          </div>
                          {saved === order.id && <p className="font-body text-xs font-bold mt-2" style={{ color: '#16A34A' }}>✓ Updated</p>}
                        </div>

                        <div className="flex gap-3 pt-3" style={{ borderTop: `1px solid ${bdr}` }}>
                          <button onClick={() => cancelOrder(order.id)} disabled={order.status === 'cancelled'}
                            className="px-4 py-2 rounded-xl font-body font-bold text-xs uppercase cursor-pointer"
                            style={{ background: 'rgba(220,38,38,0.06)', color: order.status === 'cancelled' ? '#9A948D' : '#DC2626', border: '1px solid rgba(220,38,38,0.15)' }}>
                            {order.status === 'cancelled' ? 'Cancelled' : 'Cancel Order'}
                          </button>
                          <button onClick={() => deleteOrder(order.id)}
                            className="px-4 py-2 rounded-xl font-body font-bold text-xs uppercase cursor-pointer"
                            style={{ background: 'rgba(220,38,38,0.06)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.15)' }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="flex flex-col gap-5">
              <p className="font-body text-xs text-charcoal/40">{allProducts.length} products</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allProducts.map(product => (
                  <div key={product.id} className="rounded-2xl overflow-hidden group" style={{ background: card, border: `1px solid ${bdr}` }}>
                    <div className="relative h-44 overflow-hidden">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full font-body font-bold text-[9px] uppercase" style={{ background: '#A8553D', color: '#FBF8F3' }}>
                        {product.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-body font-bold text-xs text-charcoal truncate mb-1">{product.name}</p>
                      <p className="font-display font-black text-lg leading-none mb-3" style={{ color: '#A8553D' }}>${product.price}</p>
                      <Link to={`/product/${product.id}`} className="block w-full py-2 rounded-lg font-body font-bold text-[10px] uppercase tracking-wide text-center hover:opacity-80 transition-all" style={{ background: '#F5F0E8', color: '#2D2A26' }}>
                        View Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="flex flex-col gap-5">
              <p className="font-body text-xs text-charcoal/40">{customers.length} customers</p>
              <div className="rounded-2xl overflow-hidden" style={{ background: card, border: `1px solid ${bdr}` }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#FAFAF9', borderBottom: `1px solid ${bdr}` }}>
                      {["Customer", "Email", "Phone", "Orders", "Total Spent"].map((h, hi) => (
  <th key={h} className={`px-5 py-3 text-left font-body font-bold text-[10px] uppercase tracking-widest text-charcoal/30 ${hi === 1 || hi === 2 ? 'hidden md:table-cell' : ''}`}>{h}</th>
))}
                        
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c, i) => {
                      const cOrders = orders.filter(o => o.email === c.email);
                      const spent   = cOrders.reduce((s, o) => s + o.total, 0);
                      return (
                        <tr key={i} style={{ borderTop: i > 0 ? `1px solid ${bdr}` : 'none' }}>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm flex-shrink-0" style={{ background: '#A8553D', color: '#FBF8F3' }}>
                                {c.customer?.charAt(0).toUpperCase()}
                              </div>
                              <p className="font-body font-bold text-sm text-charcoal">{c.customer}</p>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-body text-xs text-charcoal/60">{c.email}</td>
                          <td className="px-5 py-4 font-body text-xs text-charcoal/60">{c.phone || '—'}</td>
                          <td className="px-5 py-4">
                            <span className="px-2 py-1 rounded-lg font-body font-bold text-[10px]" style={{ background: '#F5F0E8', color: '#A8553D' }}>
                              {cOrders.length} order{cOrders.length > 1 ? 's' : ''}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-display font-black text-sm" style={{ color: '#A8553D' }}>${spent}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default AdminPage;