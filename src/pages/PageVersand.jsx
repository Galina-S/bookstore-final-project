export const PageVersand = () => {
  
  return (
    <>
    <div className="page-versand">

    <div className="first-section">
        <div className="crop">
           <img style={{width:'200px', height: '200px'}} src="https://www.shutterstock.com/image-photo/call-center-agent-headset-working-260nw-1607982631.jpg" /></div>
        <div>
           <h4>Unsere Kundenhotlines</h4>
           <p>Wir sind Montag bis Sonntag von 0 - 24 Uhr für Sie erreichbar und freuen uns auf Ihre Anfrage.</p>
           <h6>Kundenservice: +49 040 / 123 45 67</h6>
           <h6>E-Mail: info@bookshopify.de</h6>
           <h6>WhatsApp: +49 159 765 4321</h6>
    </div>
    </div>

    <h3>Online-Hilfe: Versand & Lieferung</h3>

    <div className="versand-info">
        <div>
        <h4>Versand und Lieferung: Versandkosten</h4>
        {/* <p><strong>Reguläre Versandkosten innerhalb Deutschlands:</strong></p> */}
        <p> Alle Buch - Bestellungen liefern wir innerhalb Deutschlands versandkostenfrei!</p>   
        <p>Schneller, versicherter Versand per DHL mit Sendungsverfolgung ist für Sie wichtig? 
            Diesen Service bieten wir gegen einen Aufpreis von nur 2,95 EUR an. 
            Der Premiumversand ist nur innerhalb Deutschlands verfügbar. </p>     
        <p>Wir liefern in folgende Länder: Deutschland, Schweiz, Österreich und Liechtenstein.</p>   
        <p>Lieferungen in das Ausland berechnen wir mit 4,50 EUR Versandkostenpauschale.</p>

        <h4>Lieferadresse:</h4>
        <p>Die Lieferadresse können Sie frei wählen und muss nicht mit der Rechnungsadresse übereinstimmen. 
        So können Sie Ihre Bestellung auch bequem ins Büro, eine Packstation oder direkt an Freunde und Bekannte versenden lassen. </p>
        <h4>Versanddauer:</h4>
        <p>Der Versand von sofort lieferbaren Artikeln erfolgt an Werktagen i.d.R. innerhalb von 24 Stunden. </p>
        <p>Lieferung nach Deutschland: je nach Versandart 1-3 Werktage</p>
        <p>Lieferung nach Österreich, Schweiz und Liechtenstein: 2-7 Werktage</p>        </div>
        </div>
    </div>
    </>
  );
};
