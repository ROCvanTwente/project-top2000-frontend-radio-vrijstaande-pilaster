import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function FAQ() {
    return (

        <div className="container my-5">
            <style>
                {`
                    .accordion-item {
                        background-color: #ffffff !important;
                        border: 1px solid rgba(0,0,0,0.1) !important;
                        border-radius: 8px !important; /* Afgeronde hoeken voor de kaartjes */
                        margin-bottom: 1.5rem; /* De gevraagde ruimte tussen de items */
                        overflow: hidden; /* Zorgt dat de inhoud binnen de ronde hoeken blijft */
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05); /* Subtiele schaduw voor diepte */
                    }

                .accordion-button:focus {
                    border-color: #d9151b !important;
                    box-shadow: 0 0 0 0.25rem rgba(217, 21, 27, 0.25) !important;
                }

                .accordion-button:not(.collapsed) {
                    background-color: rgba(217, 21, 27, 0.05) !important;
                    color: #d9151b !important;
                }

                .accordion-button:not(.collapsed)::after {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23d9151b'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e") !important;
                }
                `}
            </style>
            

            <h1 className="text-center mb-4" style={{ color: '#d9151b', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Veelgestelde Vragen (FAQ)
            </h1>
            <p className="text-center mb-5">
                Hier vind je antwoorden op de meest gestelde vragen over de Top 2000.
            </p>

            <div className="accordion" id="faqAccordion">
                {/* Vraag 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Wat is de Top 2000?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            De Top 2000 is een jaarlijkse lijst van de beste 2000 liedjes aller tijden, samengesteld door luisteraars van NPO Radio 2. Het is een muzikaal evenement dat plaatsvindt rond de jaarwisseling.
                        </div>
                    </div>
                </div>

                {/* Vraag 2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Hoe kan ik stemmen op mijn favoriete nummers?
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            Je kunt stemmen via de officiële website van NPO Radio 2 of via de Top 2000 app. Stemmen is mogelijk gedurende een bepaalde periode voor de uitzending.
                        </div>
                    </div>
                </div>

                {/* Vraag 3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Wanneer wordt de Top 2000 uitgezonden?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            De Top 2000 wordt traditioneel uitgezonden van 25 december tot en met 31 december. Het is een non-stop uitzending van 2000 nummers op NPO Radio 2.
                        </div>
                    </div>
                </div>

                {/* Vraag 4 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Kan ik de Top 2000 online luisteren?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            Ja, je kunt de Top 2000 live luisteren via de website van NPO Radio 2, de NPO Radio 2 app of via diverse streamingdiensten die de uitzending doorgeven.
                        </div>
                    </div>
                </div>

                {/* Vraag 5 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            Wat zijn de criteria voor de Top 2000 lijst?
                        </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            De lijst wordt bepaald door de stemmen van luisteraars. Elk jaar kunnen mensen stemmen op hun favoriete nummers uit de geschiedenis van de popmuziek.
                        </div>
                    </div>
                </div>

                {/* Vraag 6 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            Hoe oud moet je zijn om te stemmen?
                        </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                            Er is geen minimumleeftijd om te stemmen, maar je moet wel een account hebben bij NPO Radio 2 om deel te nemen aan de stemming.
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p>Heb je nog andere vragen? Neem contact met ons op via de <a href="/contact" style={{ color: '#d9151b', fontWeight: 'bold' }}>contactpagina</a>.</p>
            </div>
        </div>
    );
}