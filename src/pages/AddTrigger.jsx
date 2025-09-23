import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import TriggerDialog from "../components/TriggerDialog/TriggerDialog";
import "./../styles/AddTrigger.scss";
 
/** sanitize a trigger row to enforce business rules */
const sanitize = (r) => {
  const row = { ...r };
  row.type = row.type === "Actionable" ? "Actionable" : "Informational";
  if (row.type === "Informational") {
    row.priority = "Informational";
  } else {
    if (!["P1", "P2"].includes(row.priority)) row.priority = "P1";
  }
  return row;
};
 
export default function AddTrigger() {
  const seed = [
    {
      trigger: "OI-RDA Machines: Disk Queue greater than or equal 1",
      category: "OI-RDA",
      type: "Actionable",
      priority: "P1",
    },
    {
      trigger: "SAP-SW Machines: Computer Down ",
      category: "SAP",
      type: "Actionable",
      priority: "P1", // was "1", fixed by sanitize
    },
    {
      trigger: "Linux Xterm Process Ended ",
      category: "Linux",
      type: "Informational",
      priority: "Informational",
    },
    {
      trigger: "ADC Storefront LB restored",
      category: "ADC",
      type: "Informational",
      priority: "Informational",
    },
    {
      trigger: "CITRIX Machines: Less 5GB AND less 10 Percent",
      category: "CITRIX",
      type: "Actionable",
      priority: "P2",
    },
  ];
 
  const [triggers, setTriggers] = useState(() => seed.map(sanitize));
 
  // dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dialogInitial, setDialogInitial] = useState(null);
  const [error, setError] = useState("");
 
  // delete confirmation
  const [deleteIndex, setDeleteIndex] = useState(null);
 
  // filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterType, setFilterType] = useState("");
 
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  // Derived lists for filter dropdowns
  const categories = useMemo(
    () => Array.from(new Set(triggers.map((t) => t.category))).sort(),
    [triggers]
  );
 
  // Filtered & sanitized list
  const filtered = useMemo(() => {
    return triggers.filter((t) => {
      return (
        (filterCategory ? t.category === filterCategory : true) &&
        (filterPriority ? t.priority === filterPriority : true) &&
        (filterType ? t.type === filterType : true)
      );
    });
  }, [triggers, filterCategory, filterPriority, filterType]);
 
  // Reset page if filters change
  useEffect(() => {
    setPage(0);
  }, [filterCategory, filterPriority, filterType, rowsPerPage]);
 
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(filtered.length / rowsPerPage) - 1);
    if (page > maxPage) setPage(0);
  }, [filtered.length, rowsPerPage, page]);
 
  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
 
  /** Add or update trigger with validation */
  const handleDialogSave = (newRow) => {
    const sanitized = sanitize(newRow);
 
    // duplicate check (trigger + category)
    const duplicate = triggers.some(
      (t, idx) =>
        idx !== editingIndex &&
        t.trigger.trim().toLowerCase() === sanitized.trigger.trim().toLowerCase() &&
        t.category.trim().toLowerCase() === sanitized.category.trim().toLowerCase()
    );
 
    if (duplicate) {
      setError("A trigger with this Trigger + Category already exists.");
      return;
    }
 
    if (editingIndex !== null) {
      const updated = [...triggers];
      updated[editingIndex] = sanitized;
      setTriggers(updated);
      setEditingIndex(null);
    } else {
      setTriggers((prev) => [sanitized, ...prev]); // add new to top
      setPage(0);
    }
 
    setDialogInitial(null);
    setOpenDialog(false);
    setError("");
  };
 
  const handleEdit = (index) => {
    setEditingIndex(index);
    setDialogInitial(triggers[index]);
    setOpenDialog(true);
    setError("");
  };
 
  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      setTriggers((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
  };
 
  return (
    <div className="add-trigger">
      <h2>Trigger List</h2>
 
      <div className="filters">
        <FormControl size="small" sx={{ minWidth: 160, mr: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            label="Category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
 
        <FormControl size="small" sx={{ minWidth: 160, mr: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filterPriority}
            label="Priority"
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="P1">P1</MenuItem>
            <MenuItem value="P2">P2</MenuItem>
            <MenuItem value="Informational">Informational</MenuItem>
          </Select>
        </FormControl>
 
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            label="Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Informational">Informational</MenuItem>
            <MenuItem value="Actionable">Actionable</MenuItem>
          </Select>
        </FormControl>
      </div>
 
      {error && (
        <p style={{ color: "red", marginTop: "8px", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}
 
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trigger</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
 
          <TableBody>
            {paginated.map((row, idx) => (
              <TableRow key={`${row.trigger}-${idx}-${row.category}`}>
                <TableCell>{row.trigger}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  {row.type === "Informational"
                    ? "Informational"
                    : row.priority}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(page * rowsPerPage + idx)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => setDeleteIndex(page * rowsPerPage + idx)}
                    color="default"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
 
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No rows
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
 
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>
 
      <div style={{ marginTop: 16 }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenDialog(true);
            setEditingIndex(null);
            setDialogInitial(null);
            setError("");
          }}
        >
          Add Trigger
        </Button>
      </div>
 
      <TriggerDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingIndex(null);
          setDialogInitial(null);
          setError("");
        }}
        onSave={handleDialogSave}
        initialData={dialogInitial}
      />
 
      {/* Delete confirmation popup */}
      <Dialog open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete trigger{" "}
            <strong>
              {deleteIndex !== null &&
                `${triggers[deleteIndex].trigger} (${triggers[deleteIndex].category})`}
            </strong>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteIndex(null)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}