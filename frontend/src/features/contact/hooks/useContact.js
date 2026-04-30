import { useState } from "react";
import contactService from "../../../services/contactService";

// Hook for contact form state and submission
export function useContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await contactService.sendContactMessage(form);

      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { form, sent, loading, error, handleChange, handleSubmit };
}
