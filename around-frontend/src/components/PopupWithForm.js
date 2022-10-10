import closeButton from "../images/Close-Icon.svg";

const PopupWithForm = (props) => {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <button
          className="modal__close-btn"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        >
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="closing icon"
          />
        </button>
        <form
          action="submit"
          className="form"
          name={props.name}
          autoComplete="off"
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button
            className="modal__button modal__button_type_delete"
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
