import React from "react";
import { Modal, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const FormModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ backgroundColor: "white", padding: "5rem" }}>
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        {children}
      </div>
    </Modal>
  );
};

export default FormModal;
