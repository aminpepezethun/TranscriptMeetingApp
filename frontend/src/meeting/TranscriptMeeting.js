import React, { useState } from "react";

const API_URL = "http://localhost:8000"; // Adjust if needed

const TranscriptMeeting = () => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTranscript("");
    setError("");
  };

  const handleTranscriptize = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setLoading(true);
    setError("");
    setTranscript("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/transcriptize`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.detail || "Transcription failed.");
      } else {
        setTranscript(data.transcript || "");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Transcript Meeting</h2>
        <div className="mb-3">
          <input
            type="file"
            accept=".mp3,.wav,.mp4,.mov"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="btn btn-primary mb-3"
          onClick={handleTranscriptize}
          disabled={loading}
        >
          {loading ? "Processing..." : "Transcriptize"}
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
        {transcript && (
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Transcript</h5>
              <div>
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={handleCopy}>
                  Copy
                </button>
                <button className="btn btn-outline-success btn-sm" onClick={handleDownload}>
                  Download as .txt
                </button>
              </div>
            </div>
            <div
              className="border rounded p-3"
              style={{ minHeight: "150px", background: "#f8f9fa", whiteSpace: "pre-wrap" }}
            >
              {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptMeeting;