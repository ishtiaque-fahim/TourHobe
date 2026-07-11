import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Resorts = () => {
    const [resorts, setResorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [district, setDistrict] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const fetchResorts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (district) params.district = district;
            if (category) params.category = category;
            if (minPrice) params.minPrice = minPrice;
            if (maxPrice) params.maxPrice = maxPrice;

            const res = await axios.get('http://localhost:5000/api/resorts', { params });
            setResorts(res.data);
        } catch (error) {
            console.error('Failed to fetch resorts:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchResorts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchResorts();
    };

    const handleReset = () => {
        setSearch('');
        setDistrict('');
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setTimeout(fetchResorts, 100);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center text-primary mb-2">
                Discover Resorts
            </h1>
            <p className="text-center text-gray-500 mb-8">
                Find the perfect resort in Bangladesh
            </p>

            {/* Search & Filter */}
            <form onSubmit={handleSearch} className="bg-base-200 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search resorts..."
                        className="input input-bordered w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="select select-bordered w-full"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    >
                        <option value="">All Districts</option>
                        <option value="Bandarban">Bandarban</option>
                        <option value="Rangamati">Rangamati</option>
                        <option value="Cox's Bazar">Cox's Bazar</option>
                    </select>
                    <select
                        className="select select-bordered w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="resort">Resort</option>
                        <option value="cottage">Cottage</option>
                        <option value="homestay">Homestay</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="number"
                        placeholder="Min price per night"
                        className="input input-bordered w-full"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max price per night"
                        className="input input-bordered w-full"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary flex-1">
                            Search
                        </button>
                        <button type="button" onClick={handleReset} className="btn btn-ghost flex-1">
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {/* Results Count */}
            {!loading && (
                <p className="text-gray-500 mb-4">{resorts.length} resorts found</p>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            {/* Resort Cards */}
            {!loading && resorts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl">No resorts found</p>
                    <p className="text-gray-500 mt-2">Try different search filters</p>
                </div>
            )}

            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resorts.map((resort) => (
                        <div key={resort._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <figure>
                                <img
                                    src={resort.images[0]}
                                    alt={resort.name}
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title text-lg">{resort.name}</h2>
                                    <span className="badge badge-primary">{resort.category}</span>
                                </div>
                                <p className="text-gray-500 text-sm">📍 {resort.district}</p>
                                <p className="text-sm line-clamp-2">{resort.description}</p>

                                {/* Amenities */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {resort.amenities.slice(0, 3).map((amenity, i) => (
                                        <span key={i} className="badge badge-outline badge-sm">{amenity}</span>
                                    ))}
                                    {resort.amenities.length > 3 && (
                                        <span className="badge badge-outline badge-sm">+{resort.amenities.length - 3} more</span>
                                    )}
                                </div>

                                {/* Rating & Price */}
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">⭐</span>
                                        <span className="font-semibold">{resort.avgRating}</span>
                                        <span className="text-gray-400 text-sm">({resort.totalReviews})</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-primary font-bold text-lg">৳{resort.pricePerNight}</span>
                                        <span className="text-gray-400 text-sm">/night</span>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-2">
                                    <Link
                                        to={`/resorts/${resort._id}`}
                                        className="btn btn-primary btn-sm w-full"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resorts;