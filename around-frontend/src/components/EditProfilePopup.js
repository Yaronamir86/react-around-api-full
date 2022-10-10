import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit-profile"
      name="edit-profile"
      isOpen={isOpen}
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset form__fieldset_type_profile">
        <input
          id="name-input"
          type="text"
          name="user"
          placeholder="name"
          className="form__input form__input_type_name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="form__input-error name-input-error"></span>
        <input
          id="about-me-input"
          type="text"
          name="about"
          placeholder="about me"
          className="form__input form__input_type_about-me"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span className="form__input-error about-me-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfileModal;
