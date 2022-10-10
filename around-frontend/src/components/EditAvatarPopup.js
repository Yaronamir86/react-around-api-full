import React from "react";
import { useRef, useEffect  } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const urlInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(urlInput.current.value);
  }

  useEffect(() => {
    if (isOpen) {
       urlInput.current.value = ''
     }
   }, [isOpen]) 


  return (
    <PopupWithForm
      title="Change profile picture"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
    >
      <fieldset className="form__fieldset form__fieldset_type_avatar">
        <input
          id="avatar-input"
          type="url"
          name="Image link"
          placeholder="Image link"
          className="form__input form__input_type_image-link"
          required
          ref={urlInput}
        />
        <span className="form__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
