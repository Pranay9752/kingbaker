import React, { useState } from 'react';
import { Search, Filter, Plus, X, ChevronDown, ChevronUp, ShoppingBag, ChevronLeft } from 'lucide-react';

const VendorMapping = ({ onBack }) => {
    // Sample cake and gift product data
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Chocolate Truffle Cake',
            category: 'Cakes',
            price: '$49.99',
            description: 'Rich chocolate ganache with smooth truffle layers',
            image: '/api/placeholder/300/200',
            isMapped: true
        },
        {
            id: 2,
            name: 'Red Velvet Celebration',
            category: 'Cakes',
            price: '$54.99',
            description: 'Classic red velvet with cream cheese frosting',
            image: '/api/placeholder/300/200',
            isMapped: true
        },
        {
            id: 3,
            name: 'Birthday Gift Hamper',
            category: 'Gift Boxes',
            price: '$89.99',
            description: 'Curated gift set with chocolates, candles, and personalized card',
            image: '/api/placeholder/300/200',
            isMapped: true
        },
        {
            id: 4,
            name: 'Vanilla Blueberry Cake',
            category: 'Cakes',
            price: '$44.99',
            description: 'Light vanilla sponge with fresh blueberry compote',
            image: '/api/placeholder/300/200',
            isMapped: false
        },
        {
            id: 5,
            name: 'Congratulations Gift Set',
            category: 'Gift Boxes',
            price: '$79.99',
            description: 'Premium champagne with assorted chocolates and flowers',
            image: '/api/placeholder/300/200',
            isMapped: false
        },
        {
            id: 6,
            name: 'Mango Passion Fruit Cake',
            category: 'Cakes',
            price: '$59.99',
            description: 'Tropical mango cake with passion fruit mousse',
            image: '/api/placeholder/300/200',
            isMapped: false
        },
        {
            id: 7,
            name: 'Anniversary Special Cake',
            category: 'Cakes',
            price: '$69.99',
            description: 'Elegant two-tier cake with gold accents and roses',
            image: '/api/placeholder/300/200',
            isMapped: true
        },
        {
            id: 8,
            name: 'Custom Gift Basket',
            category: 'Gift Boxes',
            price: '$99.99',
            description: 'Personalized gift basket with selection of premium treats',
            image: '/api/placeholder/300/200',
            isMapped: false
        },
    ]);

    // State management
    const [viewMode, setViewMode] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter products based on mapped status, search query, and category
    const filteredProducts = products.filter(product => {
        const matchesView = viewMode === 'all' ||
            (viewMode === 'mapped' && product.isMapped) ||
            (viewMode === 'unmapped' && !product.isMapped);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesView && matchesSearch && matchesCategory;
    });

    // Get unique categories for the filter dropdown
    const categories = ['All', ...new Set(products.map(product => product.category))];

    // Toggle product mapping status
    const toggleMapping = (productId) => {
        setProducts(products.map(product =>
            product.id === productId
                ? { ...product, isMapped: !product.isMapped }
                : product
        ));
    };

    return (
        <div className="flex flex-col min-h-screen bg- [#1a1f25] text-gray-100">
            {/* Header */}
            <header className="p-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">


                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onBack()}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${viewMode === 'all'
                                    ? 'bg-gray-900/40 text-purple-300'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={() => setViewMode('all')}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${viewMode === 'all'
                                    ? 'bg-purple-900/40 text-purple-300'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            All Products
                        </button>
                        <button
                            onClick={() => setViewMode('mapped')}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${viewMode === 'mapped'
                                    ? 'bg-blue-900/40 text-blue-300'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            Mapped Products
                        </button>
                        <button
                            onClick={() => setViewMode('unmapped')}
                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${viewMode === 'unmapped'
                                    ? 'bg-pink-900/40 text-pink-300'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            Unmapped Products
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-hidden flex flex-col">
                {/* Search and Filter */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="relative flex-1 min-w-72">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search cakes and gifts..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 focus:outline-none"
                        >
                            <Filter className="h-5 w-5" />
                            <span>Filter</span>
                            {isFilterOpen ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                <div className="p-3">
                                    <h3 className="mb-2 text-sm font-medium text-gray-400">Category</h3>
                                    <div className="space-y-2">
                                        {categories.map(category => (
                                            <label key={category} className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={selectedCategory === category}
                                                    onChange={() => setSelectedCategory(category)}
                                                    className="form-radio text-pink-500 focus:ring-pink-500 focus:ring-offset-gray-800"
                                                />
                                                <span className="text-sm">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status message for filtered views */}
                {filteredProducts.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-gray-700 max-w-md">
                            <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                            <h3 className="text-xl font-medium mb-2">No products found</h3>
                            <p className="text-gray-400">
                                {viewMode === 'mapped'
                                    ? "You haven't mapped any products yet. Try mapping some products from the unmapped section."
                                    : viewMode === 'unmapped'
                                        ? "All your products are currently mapped. Great job!"
                                        : "No products match your current filters. Try adjusting your search or filters."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 transition-transform hover:scale-102 flex flex-col"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${product.isMapped
                                                ? 'bg-green-900/70 text-green-300'
                                                : 'bg-gray-900/70 text-gray-300'
                                            }`}>
                                            {product.isMapped ? 'Mapped' : 'Unmapped'}
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="mb-2">
                                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                                                {product.category}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                                        <p className="text-gray-400 text-sm mb-3 flex-1">{product.description}</p>

                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="font-medium text-lg">{product.price}</span>
                                            <button
                                                onClick={() => toggleMapping(product.id)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${product.isMapped
                                                        ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                                                        : 'bg-green-900/20 text-green-400 hover:bg-green-900/40'
                                                    }`}
                                            >
                                                {product.isMapped ? (
                                                    <>
                                                        <X className="h-3.5 w-3.5" /> Unmap
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="h-3.5 w-3.5" /> Map
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer with stats */}
            <footer className="p-4 border-t border-gray-700 bg-gray-800/50">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-sm text-gray-400">
                            {products.filter(p => p.isMapped).length} mapped / {products.length} total products
                        </span>
                    </div>
                    <div className="text-sm text-gray-400">
                        {new Date().toLocaleDateString()}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VendorMapping;