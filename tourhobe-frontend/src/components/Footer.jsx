const Footer = () => {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content p-10 mt-10">
            <div>
                <img src="/src/assets/logo.png" alt="TourHobe Logo" className="w-32 mb-2" />
            </div>
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