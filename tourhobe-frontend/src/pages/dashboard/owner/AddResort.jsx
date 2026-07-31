import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const AddResort = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        district: '',
        category: '',
        description: '',
        pricePerNight: '',
        amenities: '',
        images: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = await currentUser.getIdToken();
            await axios.post(
                'https://tourhobe-backend.onrender.com/api/resorts',
                {
                    name: formData.name,
                    district: formData.district,
                    category: formData.category,
                    description: formData.description,
                    pricePerNight: Number(formData.pricePerNight),
                    amenities: formData.amenities.split(',').map(a => a.trim()),
                    images: formData.images.split(',').map(i => i.trim()),
                    location: { lat: 0, lng: 0 }
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('✅ Resort submitted successfully! Waiting for admin approval.');
            setFormData({
                name: '',
                district: '',
                category: '',
                description: '',
                pricePerNight: '',
                amenities: '',
                images: ''
            });
        } catch (error) {
            setMessage('❌ Failed to submit resort. ' + (error.response?.data?.message || error.message));
        }
        setLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary mb-6">➕ Add New Resort</h2>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Resort Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. Chimbuk Hill Resort"
                                className="input input-bordered"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">District</span>
                                </label>
                                <select
                                    name="district"
                                    className="select select-bordered"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select District</option>
                                    <option value="Bandarban">Bandarban</option>
                                    <option value="Rangamati">Rangamati</option>
                                    <option value="Cox's Bazar">Cox's Bazar</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Category</span>
                                </label>
                                <select
                                    name="category"
                                    className="select select-bordered"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="resort">Resort</option>
                                    <option value="cottage">Cottage</option>
                                    <option value="homestay">Homestay</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <textarea
                                name="description"
                                className="textarea textarea-bordered"
                                placeholder="Describe your resort..."
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price Per Night (৳)</span>
                            </label>
                            <input
                                type="number"
                                name="pricePerNight"
                                placeholder="e.g. 3500"
                                className="input input-bordered"
                                value={formData.pricePerNight}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Amenities</span>
                                <span className="label-text-alt">comma separated</span>
                            </label>
                            <input
                                type="text"
                                name="amenities"
                                placeholder="WiFi, Pool, Restaurant, Parking"
                                className="input input-bordered"
                                value={formData.amenities}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Image URLs</span>
                                <span className="label-text-alt">comma separated</span>
                            </label>
                            <input
                                type="text"
                                name="images"
                                placeholder="https://example.com/image1.jpg"
                                className="input input-bordered"
                                value={formData.images}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {message && (
                            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
                                <span>{message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span> : 'Submit for Approval'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddResort;