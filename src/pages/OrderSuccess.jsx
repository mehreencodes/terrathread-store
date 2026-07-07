import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function OrderSuccess() {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("saving"); // saving | done | error

  useEffect(() => {
    const saveOrder = async () => {
      const pendingRaw = localStorage.getItem("tt_pending_order");
      if (!pendingRaw) {
        setStatus("error");
        return;
      }

      const pending = JSON.parse(pendingRaw);
      setOrder(pending);

      try {
        await setDoc(doc(db, "orders", pending.id), {
          ...pending,
          userId: user?.uid || null,
          status: "processing",
          paid: true,
        });
        clearCart();
        localStorage.removeItem("tt_pending_order");
        setStatus("done");
      } catch (err) {
        console.error("Failed to save order after payment:", err);
        setStatus("error");
      }
    };

    saveOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "saving") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: "#E8DCC8", borderTopColor: "#A8553D" }}
        />
        <p className="font-body text-sm text-charcoal/50">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream gap-4 px-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          style={{ background: "#F5F0E8" }}
        >
          <i className="ti ti-alert-circle" style={{ fontSize: "28px", color: "#E8614A" }} />
        </div>
        <h1 className="font-display font-black text-2xl uppercase text-charcoal">Something Went Wrong</h1>
        <p className="font-body text-sm text-charcoal/50 max-w-sm">
          We couldn't confirm your order details. If payment was deducted, please contact support with your payment reference.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full px-6 py-3 mt-2"
          style={{ background: "#A8553D" }}
        >
          Contact Support
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-20">
      <div className="max-w-md w-full text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "#A8553D" }}
        >
          <i className="ti ti-check" style={{ fontSize: "36px", color: "#FBF8F3" }} />
        </div>
        <h1 className="font-display font-black text-3xl uppercase text-charcoal mb-2">Payment Successful!</h1>
        <p className="font-body text-sm text-charcoal/60 mb-8">
          Thank you{order?.customer ? `, ${order.customer.split(" ")[0]}` : ""}! Your order has been confirmed.
        </p>

        {order && (
          <div className="rounded-2xl p-5 text-left mb-8" style={{ background: "#F5F0E8" }}>
            <div className="flex justify-between font-body text-sm mb-1">
              <span className="text-charcoal/60">Order ID</span>
              <span className="font-bold text-charcoal">{order.id}</span>
            </div>
            <div className="flex justify-between font-body text-sm border-t border-charcoal/10 pt-2 mt-2">
              <span className="font-bold text-charcoal">Amount Paid</span>
              <span className="font-black text-charcoal">Rs {order.total?.toLocaleString()}</span>
            </div>
          </div>
        )}

        <Link
          to="/shop"
          className="inline-flex items-center justify-center gap-3 w-full font-body font-bold text-xs uppercase tracking-widest text-cream rounded-full py-4"
          style={{ background: "#A8553D" }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;