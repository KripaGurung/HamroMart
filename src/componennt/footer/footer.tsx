import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footerContainer">
        <div className="footerBox">
          <div className="footerLeft">HamroMart</div>

            <div className="footerRight">
               <h3>Legal</h3>
               <ul>
                   <li><a href="/terms">Terms of Service</a></li>
                   <li><a href="/privacy">Privacy Policy</a></li>
                   <li><a href="/customer">Customer Services</a></li>
                </ul>
            </div> 
        </div>
        
        <hr className="footerLine" />

        <p>© 2025 HamroMart. All rights reserved.</p>
    
    </footer>
  );
};

export default Footer;