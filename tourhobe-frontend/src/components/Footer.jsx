const Footer = () => {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content p-10 mt-10">
            <Link to="/" className="flex items-center gap-1">
                <img src="/tourhobe.png" alt="TourHobe" className="h-10" />
            </Link>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Privacy Policy</a>
                </div>
            </div>
            <div>
                <p>© 2026 TourHobe.com - Built by Ishtiaque, Sifat, Rayed, IIUC</p>
            </div>
        </footer>
    );
};

export default Footer;