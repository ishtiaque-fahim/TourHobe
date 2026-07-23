const About = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-secondary mb-4">
                    About <span className="text-primary">TourHobe</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    Bangladesh's first AI-powered resort discovery platform for hill districts.
                    Built by students, for travelers.
                </p>
            </div>

            {/* Mission */}
            <div className="card bg-base-200 shadow p-8 mb-8">
                <h2 className="text-2xl font-bold text-secondary mb-4">🎯 Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                    TourHobe was born from a simple observation — Bangladesh's breathtaking hill districts
                    (Bandarban, Rangamati, Cox's Bazar) are home to hundreds of beautiful resorts, but
                    tourists struggle to discover and book them easily. We built TourHobe to bridge that gap
                    with smart technology, AI recommendations, and a seamless booking experience.
                </p>
            </div>

            {/* Districts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card bg-base-100 shadow-xl text-center">
                    <div className="card-body">
                        <div className="text-5xl mb-3">🏔️</div>
                        <h3 className="card-title justify-center text-secondary">Bandarban</h3>
                        <p className="text-gray-500">Home to Bangladesh's highest peaks and most scenic hill resorts</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl text-center">
                    <div className="card-body">
                        <div className="text-5xl mb-3">🌊</div>
                        <h3 className="card-title justify-center text-secondary">Rangamati</h3>
                        <p className="text-gray-500">Beautiful Kaptai Lake surrounded by lush green hills</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl text-center">
                    <div className="card-body">
                        <div className="text-5xl mb-3">🏖️</div>
                        <h3 className="card-title justify-center text-secondary">Cox's Bazar</h3>
                        <p className="text-gray-500">World's longest sea beach with stunning hillside resorts</p>
                    </div>
                </div>
            </div>

            {/* Team */}
            <div className="card bg-base-100 shadow p-8 mb-8">
                <h2 className="text-2xl font-bold text-secondary mb-6 text-center">👥 Team Syndicate</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                        <div className="avatar placeholder">
                            <div className="bg-primary text-white rounded-full w-14">
                                <span className="text-xl">I</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-secondary">Ishtiaque Fahim</p>
                            <p className="text-gray-500 text-sm">Full-Stack Developer & Project Lead</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                        <div className="avatar placeholder">
                            <div className="bg-secondary text-white rounded-full w-14">
                                <span className="text-xl">S</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-secondary">Saidul Alam Sifat</p>
                            <p className="text-gray-500 text-sm">Frontend Developer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                        <div className="avatar placeholder">
                            <div className="bg-accent text-white rounded-full w-14">
                                <span className="text-xl">I</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-secondary">Ibtehaz Alam Rayed</p>
                            <p className="text-gray-500 text-sm">Backend Developer</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat bg-base-200 rounded-xl text-center">
                    <div className="stat-value text-primary">7+</div>
                    <div className="stat-desc">Resorts Listed</div>
                </div>
                <div className="stat bg-base-200 rounded-xl text-center">
                    <div className="stat-value text-primary">3</div>
                    <div className="stat-desc">Hill Districts</div>
                </div>
                <div className="stat bg-base-200 rounded-xl text-center">
                    <div className="stat-value text-primary">AI</div>
                    <div className="stat-desc">Powered Picks</div>
                </div>
                <div className="stat bg-base-200 rounded-xl text-center">
                    <div className="stat-value text-primary">3</div>
                    <div className="stat-desc">User Roles</div>
                </div>
            </div>
        </div>
    );
};

export default About;