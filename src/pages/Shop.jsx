import { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["All", "Dress", "Tops", "Skirt", "Outer", "Trendy"];

  const filteredProducts = useMemo(() => {
    let result =
      activeFilter === "All"
        ? [...products]
        : products.filter((p) => p.category === activeFilter);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeFilter, sortBy]);

  return (
    <div className="bg-cream min-h-screen">

      {/* Banner header */}
      <div className="relative h-[220px] md:h-[280px] overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shop summer collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50 flex items-center">
          <div className="px-6 md:px-12 max-w-6xl mx-auto w-full">
            <p className="font-body text-sm text-cream/80 uppercase tracking-widest mb-2 font-semibold">
              Summer Collection 2026
            </p>
            <h1 className="font-display font-black text-4xl md:text-6xl uppercase text-cream">
              Shop All
            </h1>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Filter + sort row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="flex flex-wrap gap-3 font-display text-xs md:text-sm uppercase tracking-widest">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
 className="px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
style={{
  background: activeFilter === cat ? '#A8553D' : 'transparent',
  color: activeFilter === cat ? '#FBF8F3' : '#2D2A26',
  border: `2px solid ${activeFilter === cat ? '#A8553D' : '#2D2A26'}`,
}}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-body text-sm font-semibold border-2 border-charcoal rounded-full px-5 py-2.5 bg-cream text-charcoal outline-none cursor-pointer flex-shrink-0"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>

          {/* Results count */}
          <p className="font-body text-sm text-charcoal/50 mb-6">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            {activeFilter !== "All" && ` in "${activeFilter}"`}
          </p>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
         <div className="text-center py-24">
  <div
    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
    style={{ background: '#F5F0E8' }}
  >
    <i className="ti ti-search-off" style={{ fontSize: '28px', color: '#A8553D' }} />
  </div>
  <p className="font-display uppercase text-xl text-charcoal mb-2">No Products Found</p>
  <p className="text-charcoal/50 font-body">Try selecting a different category.</p>
</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;