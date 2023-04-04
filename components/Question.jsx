import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const Question = () => {
  const [questions, setQuestions] = useState([
    {
      question: "Wie lange dauert die Lieferung?",
      answer:
        `Während des Bestellvorgangs wird Ihnen das voraussichtliche Versanddatum der von Ihnen bestellten Artikel angezeigt. Bei Standard-Lieferungen treffen die Artikel erfahrungsgemäß ca. 1-3 Werktage nach Übergabe an unseren Zustelldienstleister (Deutsche Post/DHL/Hermes) bei unseren Kunden ein. Bei der Premium-Lieferung erhalten unsere Kunden Ihre Ware bereits am nächsten Werktag nach Versand.
        Unser Zustelldienstleister (Post/DHL/Hermes) tut alles, damit Ihre Bestellung so schnell wie möglich ihr Ziel erreicht. Bitte haben Sie Verständnis dafür, dass es aufgrund schwankender Zustellzeiten (zum Beispiel infolge von witterungs- oder verkehrsbedingten Einflüssen) hin und wieder zu Lieferverzögerungen kommen kann.
        Weiterhin finden Sie in der Detail-Ansicht der jeweiligen Artikel die voraussichtliche Lieferzeit. Sollten Lieferhindernisse bestehen, teilen wir Ihnen diese per E-Mail und, wenn möglich, mit Angabe des voraussichtlichen Liefertermins, mit. Handelt es sich um sofort lieferbare Artikel werden diese in der Regel innerhalb von 24 Stunden zur Auslieferung übergeben.`, 
      isOpen: false
    },
    {
      question: "Was kostet der Versand?",
      answer: "Reine Buchbestellungen und Bestellungen, die mindestens ein Buch enthalten, sind bei book-shopify versandkostenfrei. Ansonsten ist Ihre Bestellung innerhalb Deutschlands ab 30 Euro Warenwert versandkostenfrei. Bei Bestellungen unter 30 Euro berechnen wir 3,95 Euro für den Versand. ",
      isOpen: false
    },
    {
      question: "Wie kann ich bezahlen?",
      answer: "Sie haben die Möglichkeit, per Kreditkarte, Rechnung, Vorkasse oder per Bankeinzug zu bezahlen. Wenn Sie einen Artikel zur Abholung in der Buchhandlung bestellt haben, so bezahlen Sie diesen bequem bei Abholung in der Buchhandlung vor Ort. Sie erhalten keine Rechnung per E-Mail. Auch wenn Sie die Zahlungsweise Bankeinzug oder Kreditkarte im Bestellvorgang gewählt haben, wird der Rechnungsbetrag bei der Selbstabholung nicht abgebucht.",
      isOpen: false
    },
    {
      question: "Wie gebe ich meine Ware zurück?",
      answer: "Sollten Sie einen Artikel zurücksenden wollen und haben mit Ihrem Kundenkonto gekauft, wählen Sie bitte unter Mein Konto die Option Rücksendungen. Hier können Sie ganz einfach und schnell Ihre Rücksendungen bearbeiten. Wir tragen die Kosten der Rücksendung der Waren, wenn Sie für eine innerhalb Deutschlands veranlasste Rücksendung das von uns zur Verfügung gestellte Retouren-Etikett verwenden. Anderenfalls sind die Rücksendekosten von Ihnen zu tragen. Weiterhin haben Sie die Möglichkeit, die bestellten Artikel - unabhängig davon ob Sie zur Abholung in der Buchhandlung oder zum Versand nach Hause bestellt wurden - in einer Thalia-Buchhandlung Ihrer Wahl zurückzugeben. Wenn Sie als Gast bestellen, nutzen Sie bitte unseren Retourenservice, um ein Retourenetikett auszudrucken. Wichtig: Vergessen Sie nicht, die Auftragsnummer anzugeben, damit wir Ihre Rücksendung zuordnen können. Sie finden die Auftragsnummer beispielsweise in der Versandbestätigungsmail.",
      isOpen: false
    },
    {
        question: "Bestellen als Gast?",
        answer: "Neben der Bestellung mit Kundenkonto ist es auch möglich, eine Bestellung als Gast zu tätigen. Die Nutzung von Gutscheinen und Geschenkkarten per Post ist ebenso möglich, wie die Abholung der bestellten Artikel in der Buchhandlung.",
        isOpen: false
    },
    {
      question: "Rücksendeadresse",
      answer: "Die Rücksendeadresse für Bücher entnehmen Sie bitte Ihrem Lieferschein."
    }
  ]);

  const handleQuestionClick = (index) => {
    const newQuestions = [...questions]; 
    newQuestions[index].isOpen = !newQuestions[index].isOpen; 
    setQuestions(newQuestions); 
  };

  return (
    <div className="question">
        <h2>Häufige Servicefragen:</h2>
      {questions.map((item, index) => (
        <div className="question-container" key={index}>
          <p className="question-text" onClick={() => handleQuestionClick(index)}>
          <FontAwesomeIcon icon={faChevronDown} className="arrow-down" />
            {item.question}
          </p>
          {item.isOpen && <div className="answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
};
