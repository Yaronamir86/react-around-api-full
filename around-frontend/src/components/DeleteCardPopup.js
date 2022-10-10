/*import closeButton from "../images/Close-Icon.svg";*/
import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = ({ isOpen, onClose, isLoading, onSubmit }) => {
  return (
    <PopupWithForm
      title="are you sure?"
      name="delete-card"
      isOpen={isOpen}
      buttonText={`${isLoading ? "Deleting..." : "Yes"}`}
      onClose={onClose}
      onSubmit={onSubmit}
    ></PopupWithForm>
  );
};
export default DeleteCardPopup;
