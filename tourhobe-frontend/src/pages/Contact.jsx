import { useState } from "react";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In real app this would send to backend
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-secondary mb-4">
                    Contact <span className="text-primary">Us</span>
                </h1>
                <p className="text-gray-500 text-lg">
                    Have questions? We'd love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="flex flex-col gap-6">
                    <div className="card bg-base-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl">📧</div>
                            <div>
                                <p className="font-bold text-secondary">Email</p>
                                <p className="text-gray-500">team@tourhobe.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl">📍</div>
                            <div>
                                <p className="font-bold text-secondary">Location</p>
                                <p className="text-gray-500">IIUC, Chittagong, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-200 p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-3xl">🌐</div>
                            <div>
                                <p className="font-bold text-secondary">Website</p>
                                <p className="text-gray-500">www.tourhobe.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-200 p-6">
                        <div className="flex items-center gap-4">
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="text-xl font-bold text-secondary mb-2">Message Sent!</h3>
                                <p className="text-gray-500">We'll get back to you soon.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn btn-primary mt-4"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <h2 className="text-xl font-bold text-secondary">Send a Message</h2>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        className="input input-bordered w-full"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="input input-bordered w-full"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Message</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Your message..."
                                        rows={5}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;