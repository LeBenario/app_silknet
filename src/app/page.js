"use client";
import Image from "next/image";
import { useState } from "react";
import './global.scss';
import './bootstrap.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("Message envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Erreur : " + result.error);
      }
    } catch (error) {
      setStatus("Erreur : " + error.message);
    }
  };

  const handleRedirect = (plan, priceId) => {
    router.push(`/detail?priceId=${priceId}`);
  };

  return (
    <div className="hero_area">
      {/* Header Section */}

      {/* Hero Section */}
      <section className="hero_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="detail-box">
                <h1 className="mb-4 fontWhite">Bienvenue sur Silknet</h1>
                <p className="mb-4 fontWhite">La meilleure solution pour vos besoins d&apos;internationalisation et de traduction.</p>
                <div className="btn-box mb-4">
                  <a href="#pricing" className="btn btn-primary mr- fontWhite2">Voir nos tarifs</a>
                  <a href="#contact" className="btn btn-secondary fontWhite">Nous contacter</a>
                </div>
                <p className="fontWhite">Cliquez sur le bouton ci-dessous pour télécharger l&apos;installateur.</p>
                <a href="/setup.exe" className="btn btn-outline-secondary mt-2 fontWhite">Télécharger le Setup</a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box text-center">
                <Image src="/images/international.png" alt="Slider Image" width={500} height={500} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="price_section layout_padding" id="pricing">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="fontWhite">Tarification</h2>
          </div>
          <div className="price_container">
            <div className="box pointer" onClick={() => handleRedirect('basic', 'price_1PII6iJtRPwfS2GbInmBNXGp')}>
              <div className="detail-box">
                <h2>€ <span>150</span></h2>
                <h6>Plan Basique</h6>
                <ul className="price_features">
                  <li>Accès à l&apos;outil d&apos;ajout d&apos;attributs i18n</li>
                  <li>Génération de UUID pour les attributs i18n</li>
                  <li>Support basique</li>
                </ul>
              </div>
              <div className="btn-box">
                <a href="#">Souscrire Maintenant</a>
              </div>
            </div>
            <div className="box pointer" onClick={() => handleRedirect('pro', 'price_1PII7GJtRPwfS2Gbv5peIeCz')}>
              <div className="detail-box">
                <h2>€ <span>440</span></h2>
                <h6>Plan Pro</h6>
                <ul className="price_features">
                  <li>Toutes les fonctionnalités du Plan Basique</li>
                  <li>Accès à l&apos;outil de traduction XLF</li>
                  <li>Support prioritaire</li>
                  <li>Options de personnalisation avancées</li>
                </ul>
              </div>
              <div className="btn-box">
                <a href="#">Souscrire Maintenant</a>
              </div>
            </div>
            <div className="box pointer"
            //  onClick={() => handleRedirect('enterprise', "")}
             >
              <div className="detail-box">
                <h2>Sur devis</h2>
                <h6>Plan Entreprise</h6>
                <ul className="price_features">
                  <li>Toutes les fonctionnalités du Plan Pro</li>
                  <li>Gestionnaire de compte dédié</li>
                  <li>Développement de fonctionnalités sur mesure</li>
                  <li>Formation et support sur site</li>
                  <li>Utilisation illimitée</li>
                </ul>
              </div>
              <div className="btn-box">
                <a href="#contact">Nous contacter</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="service_section layout_padding" id="features">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="fontWhite">Fonctionnalités</h2>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s1.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>i18n Attribute Adder</h4>
                  <p>Ajoutez facilement des attributs i18n à vos projets avec des options pour remplacer les attributs existants et utiliser des UUIDs ou des IDs incrémentés.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s2.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>XLF Translator</h4>
                  <p>Traduisez des fichiers XLF avec prise en charge de plusieurs langues, garantissant que votre application est accessible à l&apos;échelle mondiale.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s3.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>Support des Projets Angular</h4>
                  <p>Gestion spéciale pour les projets Angular, y compris le préfixage des IDs avec @@.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s4.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>Suivi des Progrès</h4>
                  <p>Suivi visuel des progrès pour toutes les opérations afin de garantir des flux de travail fluides et efficaces.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s5.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>Interface Conviviale</h4>
                  <p>Interface intuitive et facile à utiliser, conçue pour les débutants comme pour les utilisateurs avancés.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s6.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>Options Personnalisables</h4>
                  <p>Options de personnalisation avancées pour adapter les outils à vos besoins spécifiques.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s6.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>Support Prioritaire et Dédié</h4>
                  <p>Obtenez de l&apos;aide quand vous en avez besoin avec des options de support prioritaire et une gestion de compte dédiée.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="box">
                <div className="img-box">
                  <Image src="/images/s6.png" alt="Service Image" width={100} height={100} />
                </div>
                <div className="detail-box">
                  <h4>Formation sur Site</h4>
                  <p>Options complètes de formation et de support pour les clients d&apos;entreprise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial Section */}
      <section className="client_section">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="fontWhite">Témoignages</h2>
            <p className="fontWhite">Quelques avis de nos clients satisfaits.</p>
          </div>
          <div id="customCarousel2" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      <div className="box">
                        <div className="img-box">
                          <Image src="/images/client.jpg" alt="Client Image" width={100} height={100} />
                        </div>
                        <div className="detail-box">
                          <div className="client_info">
                            <div className="client_name">
                              <h5>Morojink</h5>
                              <h6>Client</h6>
                            </div>
                            <i className="fa fa-quote-left" aria-hidden="true"></i>
                          </div>
                          <p>La gestion de la traduction de mes applications ne me prend plus aucun temps depuis que j&apos;utilise les outils Silknet. J&apos;ai pu économiser des semaines de travails. </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Repeat for other testimonials */}
            </div>
            <div className="carousel_btn-box">
              <a className="carousel-control-prev" href="#customCarousel2" role="button" data-slide="prev">
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#customCarousel2" role="button" data-slide="next">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact_section layout_padding-bottom" id="contact">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="fontWhite">Contactez-nous</h2>
            <p className="fontWhite">Si vous avez des questions, n&apos;hésitez pas à nous contacter à xillix.contact@gmail.com.</p>
          </div>
          <div className="row">
            <div className="col-md-8 col-lg-6 mx-auto">
              <div className="form_container">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input className="fontWhite" type="text" id="name" placeholder="Nom" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <input type="text" id="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div>
                    <textarea id="message" className="message-box" placeholder="Message" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="btn_box">
                    <button type="submit">Envoyer le Message</button>
                  </div>
                </form>
                {status && <p>{status}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Info Section */}
      <section className="info_section layout_padding2">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="info_contact">
                <h4 className="fontWhite">Adresse</h4>
                <div className="contact_link_box">
                  <a href="#">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span className="fontWhite">Emplacement: Paris</span>
                  </a>
                  <a href="tel:+011234567890">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    {/* <span className="fontWhite">Appel : +01 1234567890</span> */}
                  </a>
                  <a href="mailto:contact@silknet.fr">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span className="fontWhite">Email : contact@silknet.fr</span>
                  </a>
                </div>
              </div>
              <div className="info_social">
                <a href="https://www.facebook.com">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="https://www.twitter.com">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="https://www.linkedin.com">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
                <a href="https://www.instagram.com">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_link_box">
                <h4>Liens</h4>
                <div className="info_links">
                  <a className="active" href="#home">
                    <Image src="/images/nav-bullet.png" alt="Bullet" width={10} height={10} />
                    Accueil
                  </a>
                  <a href="#about">
                    <Image src="/images/nav-bullet.png" alt="Bullet" width={10} height={10} />
                    À propos
                  </a>
                  <a href="#features">
                    <Image src="/images/nav-bullet.png" alt="Bullet" width={10} height={10} />
                    Fonctionnalités
                  </a>
                  <a href="#pricing">
                    <Image src="/images/nav-bullet.png" alt="Bullet" width={10} height={10} />
                    Tarification
                  </a>
                  <a href="#contact">
                    <Image src="/images/nav-bullet.png" alt="Bullet" width={10} height={10} />
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_detail">
                <h4 className="fontWhite">Infos</h4>
                <p className="fontWhite">Chez Silknet nous fournissons des outils pour vous simplifier la tradution de vos sites et vous faire gagner du temps !</p>
              </div>
            </div>
            <div className="col-md-3 mb-0">
              <h4 className="fontWhite">Souscrire</h4>
              <form action="#">
                <input type="text" placeholder="Entrez l&apos;email" />
                <button type="submit" className="fontWhite">Souscrire</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="footer_section">
        <div className="container">
          <p className="fontWhite">&copy; <span id="displayYear"></span> Tous droits réservés par <a >Silknet</a></p>
        </div>
      </footer>
    </div>
  );
}
