import "./footer.css"

const Footer =() => {
    return (
        <div className="footerContainer">
            <div className="fotterBox">
                <div className="footerLeft">
                    <h2>LOGO</h2>
                    <p className="footerDescription">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                <div className="footerRight">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/customer">Customer Services</a></li>
                    </ul>
                </div>

                <hr className="footer-line" />

                <p>© 2025 HamroMart. All rights reserved.</p>

            </div>
        </div>
    ) 
}

export default Footer;