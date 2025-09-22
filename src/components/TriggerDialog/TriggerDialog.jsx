import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
 
/**
 * Props:
 *  - open (bool)
 *  - onClose (fn)
 *  - onSave (fn) -> receives { trigger, category, type, priority }
 *  - initialData (optional) -> to prefill when editing (not required here)
 */
export default function TriggerDialog({ open, onClose, onSave, initialData = null }) {
  const [trigger, setTrigger] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Informational");
  const [priority, setPriority] = useState("Informational");
 
  // Initialize fields whenever dialog opens (or when initialData changes)
  useEffect(() => {
    if (open) {
      setTrigger(initialData?.trigger ?? "");
      setCategory(initialData?.category ?? "");
      const initType = initialData?.type ?? "Informational";
      setType(initType);
      if (initType === "Informational") {
        setPriority("Informational");
      } else {
        // default actionable priority to P1 if not provided
        setPriority(initialData?.priority ?? "P1");
      }
    }
  }, [open, initialData]);
 
  // Enforce business rule when type changes
  useEffect(() => {
    if (type === "Informational") {
      setPriority("Informational");
    } else {
      // if previously informational, set P1 as default; otherwise keep current if valid
      if (priority === "Informational" || !priority) setPriority("P1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
 
  const handleSave = () => {
    if (!trigger.trim() || !category.trim()) {
      alert("Please provide both Trigger and Category.");
      return;
    }
 
    const finalPriority = type === "Informational" ? "Informational" : priority;
    if (type === "Actionable" && !["P1", "P2"].includes(finalPriority)) {
      alert("Please select a valid priority (P1 or P2) for Actionable type.");
      return;
    }
 
    const newRow = {
      trigger: trigger.trim(),
      category: category.trim(),
      type,
      priority: finalPriority,
    };
 
    onSave(newRow);
    onClose();
  };
 
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Trigger</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Trigger"
          fullWidth
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Category"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
 
        <FormControl component="fieldset" margin="dense" sx={{ marginTop: 1 }}>
          <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
            <FormControlLabel value="Informational" control={<Radio />} label="Informational" />
            <FormControlLabel value="Actionable" control={<Radio />} label="Actionable" />
          </RadioGroup>
        </FormControl>
 
        {type === "Actionable" ? (
          <FormControl fullWidth margin="dense" sx={{ marginTop: 1 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="P1">P1</MenuItem>
              <MenuItem value="P2">P2</MenuItem>
            </Select>
          </FormControl>
        ) : (
          // show disabled Priority so user sees the implied value
          <TextField
            margin="dense"
            label="Priority"
            value="Informational"
            fullWidth
            disabled
            sx={{ marginTop: 1 }}
          />
        )}
      </DialogContent>
 
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}