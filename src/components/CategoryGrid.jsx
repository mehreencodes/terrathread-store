import { Link } from "react-router-dom";
import { products } from "../data/products";

function CategoryGrid() {
  const categoryMeta = [
  {
    name: "Dresses & Skirts",
    categories: ["Dress", "Skirt"],
    link: "/shop",
    img: "https://i.pinimg.com/736x/a7/5d/2b/a75d2bdf2e3b2c6e7821a01fa23811e2.jpg",
    size: "large",
    icon: "ti-sparkles",
  },
  {
    name: "Tops & Outerwear",
    categories: ["Tops", "Outer"],
    link: "/shop",
    img: "https://plus.unsplash.com/premium_photo-1744312220338-67a6f8cf08e5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0",
    size: "small",
    icon: "ti-heart",
  },
  {
    name: "Trendy Picks",
    categories: ["Trendy"],
    link: "/shop",
    img: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "small",
    icon: "ti-star",
  },
];

  const getCount = (cats) =>
    products.filter((p) => cats.includes(p.category)).length;

  return (
    <section className="px-6 md:px-12 py-16 md:py-20" style={{ background: '#F5F0E8' }}>
      <div className="max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-body text-sm text-coral uppercase tracking-widest mb-2 font-semibold">
              Browse the edit
            </p>
            <h2 className="font-display font-black text-3xl md:text-5xl uppercase text-charcoal">
              Shop By Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-body font-semibold text-sm uppercase tracking-widest border-b-2 border-charcoal pb-1 hover:text-coral hover:border-coral transition-colors flex items-center gap-2"
          >
            View All Products
            <span>→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to={categoryMeta[0].link}
            className="group relative rounded-3xl overflow-hidden h-[300px] md:h-[520px] block"
          >
            <img
              src={categoryMeta[0].img}
              alt={categoryMeta[0].name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"></div>

            {/* <div className="absolute top-6 left-6 flex items-center gap-2 bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-body font-semibold text-xs uppercase tracking-wide text-charcoal">
  {getCount(categoryMeta[0].categories)} Items
</span>
              <span className="font-body font-semibold text-xs uppercase tracking-wide text-charcoal">
                {getCount(categoryMeta[0].categories)} Items
              </span>
            </div> */}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full">
  <i className={`ti ${categoryMeta[0].icon}`} style={{ fontSize: '16px', color: '#A8553D' }} />
  <span className="font-body font-semibold text-xs uppercase tracking-wide text-charcoal">
    {getCount(categoryMeta[0].categories)} Items
  </span>
</div>

            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
              <h3 className="font-display font-black text-3xl md:text-5xl uppercase text-cream leading-none">
                {categoryMeta[0].name}
              </h3>
              <span className="w-12 h-12 rounded-full bg-coral flex items-center justify-center text-cream flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-6 h-[300px] md:h-[520px]">
            {categoryMeta.slice(1).map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group relative rounded-3xl overflow-hidden block h-full"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent"></div>

                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-cream/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {/* <span className="text-sm">{cat.icon}</span> */}
<i className={`ti ${cat.icon}`} style={{ fontSize: '14px', color: '#A8553D' }} />                  <span className="font-body font-semibold text-[10px] uppercase tracking-wide text-charcoal">
                    {getCount(cat.categories)} Items
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <h3 className="font-display font-black text-xl md:text-2xl uppercase text-cream leading-none">
                    {cat.name}
                  </h3>
                  <span className="w-9 h-9 rounded-full bg-coral flex items-center justify-center text-cream flex-shrink-0 text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;