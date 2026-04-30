import Cookies from "js-cookie";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const contactService = {
  /**
   * Sends a contact email via the backend.
   * Requires a valid JWT token in cookies.
   */
  sendContactMessage: async (contactData) => {
    const token = Cookies.get("token");

    if (!token) {
      throw new Error("You must be logged in to send a message.");
    }

    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send message.");
    }

    return data;
  },
};

export default contactService;
