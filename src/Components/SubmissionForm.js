import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SubmissionForm() {
  const API_URL= process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    codeLanguage: '',
    stdin: '',
    sourceCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}submit`, formData);
      showAlert('success',"From Submitted Sucessfully")
    } catch (error) {
      showAlert('error',"Error submitting form");
    }
  };
  const showAlert=(icon, message)=>{
    Swal.fire({
      icon: icon,
      text: message
    })
  }

  return (
    <div className="submission-form">
      <h2 className="heading">Submission Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Preferred Code Language:</label>
          <select name="codeLanguage" value={formData.codeLanguage} onChange={handleChange}>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="form-group">
          <label>Standard Input (stdin):</label>
          <input type="text" name="stdin" value={formData.stdin} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Source Code:</label>
          <textarea name="sourceCode" value={formData.sourceCode} onChange={handleChange}></textarea>
        </div>
        <button className='btn' type="submit">Submit</button>
      </form>

      <button onClick={()=>{navigate("/")}} className='btn'>Show All the Submissions</button>
    </div>
  );
}



export default SubmissionForm
