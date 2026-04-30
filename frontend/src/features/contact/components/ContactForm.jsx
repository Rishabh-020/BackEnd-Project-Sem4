import React from "react";
import { useContact } from "../hooks/useContact";
import "../../../styles/contact.css";

export default function ContactForm() {
  const { form, sent, loading, error, handleChange, handleSubmit } =
    useContact();

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section className="contact-hero">
        <div className="container">
          <h2 className="fade-in-up">Get in Touch</h2>
          <p
            className="fade-in-up delay-1"
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "1.2rem",
              opacity: 0.9,
            }}
          >
            We're here to help you turn your travel dreams into reality. Reach
            out for bookings, collaborations, or just to say hello!
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Information */}
            <div className="contact-info-col">
              <h3>Contact Information</h3>
              <p>
                Have questions about our travel itineraries or need help with a
                booking? Our expert team is ready to assist you.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="icon-box">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Our Head Office</h4>
                    <p>
                      450 Adventure Blvd, Suite 100
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="icon-box">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4>Phone Support</h4>
                    <p>
                      +1 (800) 555-WANDER
                      <br />
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="icon-box">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email Inquiries</h4>
                    <p>
                      support@wandersphere.com
                      <br />
                      media@wandersphere.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-form-col">
              {error && (
                <div
                  className="error-message"
                  style={{
                    background: "#fff5f5",
                    color: "#c53030",
                    border: "1px solid #feb2b2",
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                  }}
                >
                  <strong>⚠️ Error:</strong> {error}
                </div>
              )}

              {sent ? (
                <div
                  className="success-message"
                  style={{
                    background: "#f0fff4",
                    color: "#276749",
                    border: "1px solid #c6f6d5",
                    padding: "2rem",
                    borderRadius: "10px",
                  }}
                >
                  <h3>✅ Message Sent!</h3>
                  <p>
                    Thank you for reaching out. One of our travel experts will
                    contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="real-submit-btn"
                    style={{ marginTop: "1rem" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-item">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-item">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-item">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Booking Inquiry"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-item">
                    <label>Message</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="real-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Submit Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h3>Frequently Asked Questions</h3>
            <p>Everything you need to know about our wandering services.</p>
          </div>

          <div className="faq-accordion">
            {[
              {
                q: "How long does it take to get a response?",
                a: "We aim to respond to all inquiries within 24 business hours. During peak holiday seasons, it may take up to 48 hours.",
              },
              {
                q: "Do you offer customized travel packages?",
                a: "Absolutely! Our travel experts specialize in creating bespoke itineraries tailored to your specific interests and budget.",
              },
              {
                q: "Can I change my booking through this form?",
                a: "For urgent booking changes, we recommend calling our support line directly for immediate assistance.",
              },
              {
                q: "Is there a fee for travel consultation?",
                a: "Initial consultations and inquiries are completely free. We only charge once a specific itinerary or booking is finalized.",
              },
            ].map((item, index) => (
              <details key={index} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <i className="fas fa-chevron-down"></i>
                </summary>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
