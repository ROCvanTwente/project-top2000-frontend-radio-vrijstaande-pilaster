import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const faqItems = [
  {
    id: 1,
    question: "Wat is de Top 2000?",
    answer:
      "De Top 2000 is een jaarlijkse lijst van de beste 2000 liedjes aller tijden, samengesteld door luisteraars van NPO Radio 2."
  },
  {
    id: 2,
    question: "Hoe kan ik stemmen op mijn favoriete nummers?",
    answer:
      "Je kunt stemmen via de officiële website van NPO Radio 2 of via de Top 2000 app."
  },
  {
    id: 3,
    question: "Wanneer wordt de Top 2000 uitgezonden?",
    answer:
      "De Top 2000 wordt uitgezonden van 25 december tot en met 31 december op NPO Radio 2."
  },
  {
    id: 4,
    question: "Kan ik de Top 2000 online luisteren?",
    answer:
      "Ja, via de website van NPO Radio 2, de app of diverse streamingdiensten."
  },
  {
    id: 5,
    question: "Wat zijn de criteria voor de Top 2000 lijst?",
    answer:
      "De lijst wordt bepaald door stemmen van luisteraars."
  },
  {
    id: 6,
    question: "Hoe oud moet je zijn om te stemmen?",
    answer:
      "Er is geen minimumleeftijd, maar je hebt wel een account nodig."
  }
];

export default function Faq() {
  return (
    <div className="container my-5">
      <h1 className="faq-title text-center mb-4">
        Veelgestelde Vragen (FAQ)
      </h1>

      <p className="text-center mb-5">
        Hier vind je antwoorden op de meest gestelde vragen over de Top 2000.
      </p>

      <div className="accordion" id="faqAccordion">
        {faqItems.map((item, index) => (
          <div className="accordion-item" key={item.id} style={{ marginBottom: '10px', border: '1px solid #ddd' }}>
            <h2 className="accordion-header" id={`heading-${item.id}`}>
              <button
                className={`accordion-button collapsed`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${item.id}`}
                aria-expanded={index === 0}
              >
                {item.question}
              </button>
            </h2>

            <div
              id={`collapse-${item.id}`}
              className={`accordion-collapse collapse`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <p>
          Heb je nog andere vragen? &nbsp;
          <Link to="/contact" className="faq-link">
            Neem contact met ons op
          </Link>
        </p>
      </div>
    </div>
  );
}