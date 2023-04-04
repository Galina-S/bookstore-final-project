export const Contact = () => {
    return (
        <div className="contact">
            <div className="contact-container">
                <div className="contact-picture">
                    <img src="https://www.shutterstock.com/image-photo/call-center-agent-headset-working-260nw-1607982631.jpg" alt="Contact-picture" />
                </div>
                <div className="contact-content">
                    <h2>Unser Kundenservice</h2>
                    <p>Wir sind Montag bis Sonntag von 0 - 24 Uhr für Sie erreichbar und freuen uns auf Ihre Anfrage.</p>
                    <p className="contsct-service">Kundenservice: +49 040 / 123 45 67</p>
                    <p>E-Mail: info@bookshopify.de</p>
                    <p>WhatsApp: +49 159 765 4321</p>
                </div>

            </div>
            <div className="contact-container">
                <div className="contact-content">
                    <h2>Bankverbindung</h2>
                    <p>HASPA</p>
                    <p>IBAN: DE06507604300024140718</p>
                    <p>BIC: HASPDEHHXXX</p>
                </div>
            </div>
        </div>
    )
}