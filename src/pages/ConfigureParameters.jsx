import React, { useState } from "react";
import "./../styles/ConfigureParameters.scss";

const ConfigureParameters = () => {
  const [formData, setFormData] = useState({
    "Job Frequency": "",
    "Max Emails Per Batch": "",
    "Outlook Email": "",
    "Outlook Password": "",
    "Outlook Server": "",
    "Jira Base URL": "",
    "Jira Email": "",
    "Jira API Token": "",
    dateField: "",
    dropdownField: "",
  });

  const placeholders = {
    "Job Frequency": "e.g. 10",
    "Max Emails Per Batch": "e.g. 500",
    "Outlook Email": "e.g. a@b.com",
    "Outlook Password": "e.g. admin",
    "Outlook Server": "e.g. server",
    "Jira Base URL": "e.g. https://baseurl.com",
    "Jira Email": "e.g. a@b.com",
    "Jira API Token": "e.g. ejwhbhqwe823197Abjwe",
    dateField: "Select Date",
    dropdownField: "Select Priority",
  };

  const descriptions = {
    "Job Frequency": "Interval (in minutes)",
    "Max Emails Per Batch": "Max emails per batch",
    "Outlook Email": "Outlook Email",
    "Outlook Password": "Outlook Password",
    "Outlook Server": "Outlook Server",
    "Jira Base URL": "Jira Base URL",
    "Jira Email": "Jira Email",
    "Jira API Token": "Jira API Token",
    dateField: "Date Received",
    dropdownField: "Priority",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved config:", formData);
    alert("Configuration saved successfully!");
  };

  const handleReset = () => {
    setFormData({
      "Job Frequency": "",
      "Max Emails Per Batch": "",
      "Outlook Email": "",
      "Outlook Password": "",
      "Outlook Server": "",
      "Jira Base URL": "",
      "Jira Email": "",
      "Jira API Token": "",
      dateField: "",
      dropdownField: "",
    });
  };

  const renderInfoIcon = (desc) => (
    <span className="info-wrapper">
      <span className="info-icon">i</span>
      <span className="info-tooltip">{desc}</span>
    </span>
  );

  return (
    <div className="configure-parameters">
      <h2>Configure Parameters</h2>
      <form className="config-form">
        {/* First 8 text fields */}
        {["Job Frequency", "Max Emails Per Batch", "Outlook Email", "Outlook Password", "Outlook Server", "Jira Base URL", "Jira Email", "Jira API Token"].map((field, idx) => (
          <div className="form-group" key={idx}>
            <div className="label-row">
              <label>{field.toUpperCase()}</label>
              {renderInfoIcon(descriptions[field])}
            </div>
            <input
              type="text"
              name={field}
              placeholder={placeholders[field]}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Date Picker */}
        <div className="form-group">
          <div className="label-row">
            <label>Received Date</label>
            {renderInfoIcon(descriptions.dateField)}
          </div>
          <input
            type="date"
            name="dateField"
            value={formData.dateField}
            onChange={handleChange}
          />
        </div>

        {/* Dropdown */}
        <div className="form-group">
          <div className="label-row">
            <label>Priority</label>
            {renderInfoIcon(descriptions.dropdownField)}
          </div>
          <select
            name="dropdownField"
            value={formData.dropdownField}
            onChange={handleChange}
          >
            <option value="">-- {placeholders.dropdownField} --</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="Informational">Informational</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button type="button" className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfigureParameters;