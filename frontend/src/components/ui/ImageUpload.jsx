import React, { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import Cookies from "js-cookie";

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const authenticator = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/imagekit/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { signature, expire, token: ikToken } = response.data;
    return { signature, expire, token: ikToken };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function ImageUpload({ onUploadSuccess, currentImage }) {
  const [uploadMode, setUploadMode] = useState("url"); // "url" or "file"
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onError = (err) => {
    console.error("Upload Error:", err);
    setError("Failed to upload image. Please try again.");
    setUploading(false);
  };

  const onSuccess = (res) => {
    console.log("Upload Success:", res);
    onUploadSuccess(res.url);
    setUploading(false);
    setError("");
  };

  const onUploadStart = () => {
    setUploading(true);
    setError("");
  };

  return (
    <div className="image-upload-container" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "0.8rem" }}>
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          style={{
            flex: 1,
            padding: "0.6rem",
            borderRadius: "10px",
            border: "1px solid var(--border-color)",
            background:
              uploadMode === "url" ? "var(--primary)" : "var(--bg-color)",
            color: uploadMode === "url" ? "white" : "var(--text-color)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "600",
            transition: "all 0.3s",
          }}
        >
          <i className="fas fa-link" style={{ marginRight: "0.5rem" }}></i>{" "}
          Image URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("file")}
          style={{
            flex: 1,
            padding: "0.6rem",
            borderRadius: "10px",
            border: "1px solid var(--border-color)",
            background:
              uploadMode === "file" ? "var(--primary)" : "var(--bg-color)",
            color: uploadMode === "file" ? "white" : "var(--text-color)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "600",
            transition: "all 0.3s",
          }}
        >
          <i className="fas fa-upload" style={{ marginRight: "0.5rem" }}></i>{" "}
          Upload File
        </button>
      </div>

      {uploadMode === "url" ? (
        <div className="form-item" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="Paste image URL here..."
            value={currentImage}
            onChange={(e) => onUploadSuccess(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-color)",
              color: "var(--text-color)",
            }}
          />
        </div>
      ) : (
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <div
            style={{
              border: "2px dashed var(--border-color)",
              padding: "1.5rem",
              borderRadius: "15px",
              textAlign: "center",
              background: "var(--pill-bg)",
              position: "relative",
            }}
          >
            {uploading ? (
              <div style={{ color: "var(--text-muted)" }}>
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ marginRight: "0.5rem" }}
                ></i>
                Uploading to ImageKit...
              </div>
            ) : (
              <>
                <IKUpload
                  fileName="blog-post-image.jpg"
                  folder="/blog-images"
                  onError={onError}
                  onSuccess={onSuccess}
                  onUploadStart={onUploadStart}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                <div style={{ color: "var(--text-muted)" }}>
                  <i
                    className="fas fa-cloud-upload-alt"
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  ></i>
                  Click or drag to upload image
                </div>
              </>
            )}
            {error && (
              <div
                style={{
                  color: "#ff4d4d",
                  marginTop: "0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                {error}
              </div>
            )}
          </div>
        </IKContext>
      )}

      {currentImage && (
        <div
          style={{
            marginTop: "1rem",
            borderRadius: "12px",
            overflow: "hidden",
            height: "100px",
            width: "100%",
            border: "1px solid var(--border-color)",
          }}
        >
          <img
            src={currentImage}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}
    </div>
  );
}
