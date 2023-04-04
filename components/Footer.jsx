import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="contact-container">
                <div className="contact-box-text">
                <h3>Haben Sie Fragen?</h3>
                <p>Wir sind 24 Stunden für Sie da.</p>
                </div>
                <div className="contact-box">
                <div className="contact-box-card">
                    <p>Kontakt per Telefon</p>
                    <p className="contact-info">+49 040 / 123 45 67 </p>
                </div>
                <div className="contact-box-card">
                    <p>Kontakt per E-Mail</p>
                    <p className="contact-info"> info@bookshopify.de</p>
                </div>
                </div>
            </div>
            <div className="footer-inner">
            <div className="footer-container">
                <NavLink to="/unternehmen" >Das Unternehmen</NavLink>
            </div>
            <div className="footer-container">
                <NavLink to="/impressum">Impressum</NavLink>
            </div>
            <div className="footer-container">
                <NavLink to="/contact">Kontakt</NavLink>
            </div>
            <div className="footer-container">
                <NavLink to="/questions">Fragen zu Bestellung</NavLink>
            </div>
            
            <div className="footer-container">
                <NavLink to="/shop/hilfe-versand">Versand und Lieferung</NavLink>
            </div>
            </div>
        </div>
    )
}