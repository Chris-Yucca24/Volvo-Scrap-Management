import React, { useState } from "react";
import backarrow from "../../../assets/image-assets/Back_Arrow.png"
import SyncButton from "../../../Common/Components/UI/SyncButton";
import AppButton from "../../../Common/Components/UI/ButtonUI";
import { useNavigate } from "react-router-dom";

const MaterialSettings = () => {
    
    const navigate = useNavigate();

      const [showAddOptions, setShowAddOptions] = useState(false);

      const [showNewKSPCBModal, setShowNewKSPCBModal] =
        useState(false);

      const [showExistingMaterialModal,
        setShowExistingMaterialModal] =
        useState(false);

       const handleNewKSPCB = () => {
    setShowNewKSPCBModal(true);
    setShowAddOptions(false);
  };

  const handleExistingMaterial = () => {
    setShowExistingMaterialModal(true);
    setShowAddOptions(false);
  };


     const handleSync = async () => {
    console.log("Syncing materials...");
    
    // API call here
    // await fetch(...)
  };

  const materialData = [
  {
    category: "Category - 1",
    partNumber: "SCRP120001",
    description: "MS & GI Steel Cut Tubes",
    addedBy: "Default",
  },
  {
    category: "Category - 1",
    partNumber: "SCRP120002",
    description: "Aluminium Cut Sheet",
    addedBy: "Default",
  },
  {
    category: "Category - 1",
    partNumber: "SCRP120003",
    description: "Stainless steel",
    addedBy: "Default",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },
  {
    category: "Category - 2",
    partNumber: "SCRP120009",
    description: "Welding Wires (Wiring Harness)",
    addedBy: "Purushothama",
  },

];


  return (
    <div className="material-main">
    <div className="backcontainer">
        <div className="left-back-cont"
        onClick={()=> navigate(-1)}>
        <img src={backarrow} alt="back-button" />
        <span>Back</span> 
        </div>

        <div className="right-sync-content">
            <SyncButton onSync={handleSync}/>
        </div>
    </div>

    <div className="material-grid-area">
        <span>Material Settings</span>

        <div className="add-materials-sect"
         onClick={() =>
              setShowAddOptions(!showAddOptions)
            }>
            <AppButton variant="filled">
              Add Material
            </AppButton>
        </div>

         {showAddOptions && (
            <div className="add-material-dropdown">

              <div
                className="dropdown-row"
                onClick={handleNewKSPCB}
              >
                New KSPCB
              </div>

              <div
                className="dropdown-row"
                onClick={handleExistingMaterial}
              >
                Existing Materials
              </div>

            </div>
          )}

        </div>

        <div className="material-table-wrapper">

  <div className="material-table-scroll">

    <table className="material-table">

      <thead>
        <tr>
          <th>Material Category</th>
          <th>Part Number</th>
          <th>Description</th>
          <th>Added by</th>
        </tr>
      </thead>

      <tbody>
        {materialData.map((item, index) => (
          <tr key={index}>
            <td>{item.category}</td>
            <td>{item.partNumber}</td>
            <td>{item.description}</td>
            <td>{item.addedBy}</td>
          </tr>
        ))}
      </tbody>

    </table>

  </div>

</div>

{/* NEW KSPCB MODAL */}

{showNewKSPCBModal && (
  <div className="modal-overlay">

    <div className="material-modal">

      <h2>Add with new KSPCB PART</h2>

      

      <div className="modal-field">
        <label>Material Category</label>

        <select>
          <option>
            Select Material Category
          </option>
        </select>
      </div>

      <div className="modal-field">
        <label>Part Number</label>

        <select>
          <option>
            Enter Part Number
          </option>
        </select>
      </div>

      <div className="modal-field">
        <label>Description</label>

        <textarea
          placeholder="Enter Description"
        />
      </div>

      <div className="modal-actions">

        <AppButton variant="outlined"
          className="cancel-btn"
          onClick={() =>
            setShowNewKSPCBModal(false)
          }
        >
          Cancel
        </AppButton>

        <AppButton variant="filled" className="save-btn">
          Save
        </AppButton>

      </div>

    </div>

  </div>
)}

{/* EXISTING MATERIAL MODAL */}

{showExistingMaterialModal && (
  <div className="modal-overlay">

    <div className="material-modal">

      <h2>Add Material</h2>

      <div className="modal-field">
        <label>Material Category</label>

        <select>
          <option>
            Select Material Category
          </option>
        </select>
      </div>

      <div className="modal-field">
        <label>Part Number</label>

        <select>
          <option>
            Enter Part Number
          </option>
        </select>
      </div>

      <div className="modal-field">
        <label>Description</label>

        <textarea
          placeholder="Enter Description"
        />
      </div>

      <div className="modal-actions">

        <AppButton variant="outlined"
          className="cancel-btn"
          onClick={() =>
            setShowExistingMaterialModal(false)
          }
        >
          Cancel
        </AppButton>

        <AppButton variant= "filled" className="save-btn">
          Save
        </AppButton>

      </div>

    </div>

  </div>
)}

    </div>
  );
};

export default MaterialSettings;