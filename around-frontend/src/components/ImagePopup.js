import closeButton from "../images/Close-Icon.svg";

const ImagePopup = (props) => {
  return (
    <div
      className={`modal modal_type_preview ${
        props.isOpen ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container modal__container_type_preview">
        <button
          className="modal__close-btn"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        >
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="closing tag"
          />
        </button>
        <img
          className="modal__image modal__image_type_preview"
          src={props.card.link}
          alt={`a beautiful place in ${props.card.name}`}
        />
        <p className="modal__title modal__title_type_preview">
          {props.card.name}
        </p>
      </div>
    </div>
  );
};
export default ImagePopup;
