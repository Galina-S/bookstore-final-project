import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <NavLink to="/unternehmen" >Das Unternehmen</NavLink>
            </div>
            <div className="footer-container">
                <NavLink to="/impressum">Impressum</NavLink>
            </div>
            <div className="footer-container">
                <NavLink>Kontakt</NavLink>
            </div>
            <div className="footer-container">
                <NavLink to="/questions">Fragen zu Bestellung</NavLink>
            </div>
            
            <div className="footer-container">
                <NavLink to="/shop/hilfe-versand">Versand und Lieferung</NavLink>
            </div>
        </div>
    )
}