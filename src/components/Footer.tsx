function Footer() {
    return (
        <>
            <footer className="footer bg-neutral text-neutral-content p-10">
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a href="https://www.privacypolicies.com/live/b11f63b9-d726-46c6-9b24-4e36f083e9ef" className="link link-hover" target="_blank">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </>
    )
}

export default Footer