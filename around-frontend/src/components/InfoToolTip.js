import React, { useEffect } from "react";
import closeButton from "../images/Close-Icon.svg";
import successIcon from "../images/success.svg";
import errorIcon from "../images/fail.svg";

const InfoToolTip = ({ isOpen, onClose, type }) => {
  const success = type === "success";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  return (
    <div className={`modal modal_type_info ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          className="modal__close-btn"
          type="button"
          aria-label="close"
          onClick={onClose}
        >
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="closing icon"
          />
        </button>
        <div>
          <img
            className="modal__icon"
            src={success ? successIcon : errorIcon}
            alt="success-sign"
          />
          <p className="modal__status-message">
            {success
              ? "Success! You have now been registered."
              : "Oops, something went wrong! Please try again."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoToolTip;
