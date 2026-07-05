const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero min-h-[80vh]" style={{ backgroundImage: 'url(/Home.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Discover Luxury Resorts</h1>
                        <p className="mb-5">Find and book the perfect resort in Beautiful Bangladesh</p>
                        <button className="btn btn-primary btn-lg">Explore Resorts</button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10">Why TourHobe?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="card-title justify-center">AI Recommendations</h3>
                            <p>Get personalized resort suggestions based on your preferences</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">🏞️</div>
                            <h3 className="card-title justify-center">Hill Districts</h3>
                            <p>Explore resorts across Bandarban, Rangamati and Cox's Bazar</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="card-title justify-center">Verified Reviews</h3>
                            <p>Read honest reviews from real tourists before you book</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;