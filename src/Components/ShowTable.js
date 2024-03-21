import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowTable() {
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get(`${API_URL}submissions`);
        setSubmissions(response.data);
        
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    }
    fetchSubmissions();
  }, []);

  function truncateText(text, maxLength) {
    console.log(text.length, 100);
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  return (
    <div>
      <h2 className="heading">Submissions</h2>
      <table className="submission-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>Standard Input</th>
            <th>Source Code</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.username}</td>
              <td>{submission.code_language}</td>
              <td>{submission.stdin}</td>
              <td>{truncateText(submission.source_code, 100)}</td>
              <td>{formatTimestamp(submission.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => { navigate("/form") }} className='btn formBtn'>Submit a new Form</button>
    </div>
  );
}

export default ShowTable;
