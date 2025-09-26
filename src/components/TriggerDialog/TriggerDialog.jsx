import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
 
const TriggerDialog = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    trigger: "",
    category: "",
    type: "Informational",
    priority: "Informational",
    state: "Enabled",
  });
 
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
 
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "type" && value === "Informational"
        ? { priority: "Informational" }
        : {}),
    }));
  };
 
  const handleSubmit = () => {
    onSave(formData);
  };
 
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialData ? "Edit Trigger" : "Add Trigger"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Trigger"
          value={formData.trigger}
          onChange={(e) => handleChange("trigger", e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Category"
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
        />
 
        {/* Type radio */}
        <RadioGroup
          row
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <FormControlLabel
            value="Informational"
            control={<Radio />}
            label="Informational"
          />
          <FormControlLabel
            value="Actionable"
            control={<Radio />}
            label="Actionable"
          />
        </RadioGroup>
 
        {/* Priority only if Actionable */}
        {formData.type === "Actionable" && (
          <Select
            fullWidth
            margin="normal"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <MenuItem value="P1">P1</MenuItem>
            <MenuItem value="P2">P2</MenuItem>
          </Select>
        )}
 
        {/* State radio */}
        <RadioGroup
          row
          value={formData.state}
          onChange={(e) => handleChange("state", e.target.value)}
        >
          <FormControlLabel value="Enabled" control={<Radio />} label="Enabled" />
          <FormControlLabel value="Disabled" control={<Radio />} label="Disabled" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
 
export default TriggerDialog;