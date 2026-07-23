import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import AppButton from "./ButtonUI";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
};

export default function Popup({ open, message, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason("");
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };
  const fields = [
    { label: "KSPCB No*", name: "KSPCBNo" },
    { label: "Waste Description* ", name: "wasteDescription" },
    { label: "Waste Type* ", name: "WasteType" },
    { label: "Disposal Method* ", name: "DisposalMethod" },
    { label: "Manifest Required (Optional)", name: "ManifestRequired" },
    { label: "Created By * ", name: "CreatedBy " },
  ];
  const [formData, setFormData] = useState({
    KSPCBNo: "",
    wasteDescription: "",
    WasteType: "",
    DisposalMethod: "",
    ManifestRequired: "",
    CreatedBy: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogContent sx={{ px: 3, py: 3 }}>
        <Typography sx={{ mb: 2 }}>{message}</Typography>

       

        {/* input field  */}
        <div className="input-field-popup-holder">
          {fields.map((field) => (
            <div className="popup-inputfield" key={field.name}>
              <label>{field.label}</label>

              <TextField
                className="text-field"
                fullWidth
                multiline
                minRows={1}
                placeholder="Enter"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="kspcb-popup-lastrow">
          {/* upload document field  */}
          <div className="upload-doc">
            <label htmlFor="">Upload Document *</label>
            <p>Click to upload or Drag and drop</p>
            <TextField
              placeholder="
     PDF, PNG, JPEG (Max 5mb)"
            />
          </div>
          {/* radio btn  */}
          <FormControl>
            <FormLabel id={""}>Status</FormLabel>
            <RadioGroup row aria-labelledby={""} name="row-radio-buttons-group">
              <FormControlLabel
                value="Active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="InActive"
                control={<Radio />}
                label="InActive"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
          <AppButton
            variant="outlined"
            onClick={handleClose}
            sx={{ height: "30px" }}
          >
            Cancel
          </AppButton>
          <AppButton
            variant="filled"
            onClick={handleConfirm}
            disabled={!reason.trim()}
            sx={{
              height: "30px",
              "&.Mui-disabled": {
                color: "#9ca3af",
                cursor: "not-allowed",
              },
            }}
          >
            + Add
          </AppButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
