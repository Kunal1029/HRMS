import React from "react";
import Modal from "./Model";
import Button from "../common/Button";
import "./warning.css";

function WarningModal({ isOpen, onClose, title, text, extrabtn, onSubmit }) {
  const handleCancel = () => {
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title={text}
      showCloseButton={true}
    >
      <div className="warningModal">
        <h2>
          {title}
        </h2>

        <div className="warningBtn">
          <Button
            classParent="warnBtn normBtn"
            type="submit"
            behaviour="primary"
            size="sm"
            className=""
            onClick={handleCancel}
          >
            Cancel
          </Button>

          {extrabtn ? (
            <Button
              classParent="extrabtn warnBtn"
              type="submit"
              onClick={onSubmit}
            >
              {extrabtn}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
}

export default WarningModal;
