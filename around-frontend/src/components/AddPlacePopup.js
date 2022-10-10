import { React, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, isLoading, onAddPlaceSubmit }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
       setName("");
       setLink("")
     }
   }, [isOpen]) 

  return (
    <PopupWithForm
      title="New place"
      name="place"
      isOpen={isOpen}
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset form__fieldset_type_place">
        <input
          id="title-input"
          type="text"
          name="Title"
          placeholder="Title"
          className="form__input form__input_type_title"
          minLength="1"
          maxLength="30"
          value={name}
          required
          onChange={handleNameChange}
        />
        <span className="form__input-error title-input-error"></span>
        <input
          id="url-input"
          type="url"
          name="Image link"
          placeholder="Image link"
          className="form__input form__input_type_image-link"
          value={link}
          required
          onChange={handleLinkChange}
        />
        <span className="form__input-error url-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
