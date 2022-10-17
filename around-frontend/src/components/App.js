import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/auth";

function App() {
  /*----------setting all pop ups to be close----------*/

  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  const [infoTooltipType, setInfoTooltipType] = useState("");
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  /*-----OPEN/CLOSE--HANDLERS--AND--USE-STATES---------------*/
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isPreviewImageOpen, setPreviewImageOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const handleEditProfileClick = () => {
    setEditProfileOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlaceOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarOpen(true);
  };
  const handleDeleteCardClick = (card) => {
    setDeletePopupOpen(true);
    setSelectedCard(card);
  };
  const handleCardClick = (card) => {
    setPreviewImageOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  const closeAllModals = () => {
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard(false);
    setPreviewImageOpen(false);
    setDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
  };

  //CHECK TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const token = localStorage.getItem("token");
      auth
        .checkToken(token)
        .then((res) => {
          if (res._id) {
            setIsLoggedIn(true);
            setEmail({ email: res.email });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err)
          history.push("/signin");
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, [history]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .getUserInfo(token)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(console.log('problem here1'));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      api
        .getInitialCards(token)
        .then((res) => {
          setCards(res);
        })
        .catch(console.log('problem here2'));
    }
  }, [token]);

  

  /*--------------------API-EDIT-HANDLERS----------------------*/
  
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .editProfile({ name, about }, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (url) => {
    setIsLoading(true);
    api
      .editAvatar(url, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllModals();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => user.id === currentUser._id);
    setIsLoading(true);
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        console.log('changed like');
        setCards((state) =>
          state.map(currentCard => {
            return currentCard._id === card._id ? newCard : currentCard;
          })
        );
      })
      .catch(() => {
       (console.log('problem in like'))
      });
  };

  const handleCardDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(selectedCard._id);
    api
      .deleteCard(selectedCard._id, token)
      .then((res) => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllModals();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlace = (card) => {
    setIsLoading(true);
    api
      .createCards(card, token)
      .then((card) => {
        setCards([card.data, ...cards]);
        closeAllModals();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  /*------------SETTING INFO USING API-------------*/

 

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res._id) {
          setInfoTooltipType("success");
          history.push("/signin");
        } else {
          //invalid data
          setInfoTooltipType("fail");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType("fail");
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          //when the 'onLogin()' handler is called the jwt is saved
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          //after successful authorization, the user is redirected to "/"
          history.push("/");
          
        } else {
          setInfoTooltipType("fail");
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setInfoTooltipType("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    //when the 'onSignOut()' handler is call, the jwt is deleted
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header onSignOut={onSignOut} isLoggedIn={isLoggedIn} email={email} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={isLoggedIn}
              isCheckingToken={isCheckingToken}
            >
              <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                cards={cards}
              />
            </ProtectedRoute>
            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />

          <ImagePopup
            card={selectedCard}
            isOpen={isPreviewImageOpen}
            onClose={closeAllModals}
          />
          <EditProfilePopup
            isLoading={isLoading}
            isOpen={isEditProfileOpen}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isLoading={isLoading}
            isOpen={isEditAvatarOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllModals}
          />
          <DeleteCardPopup
            isOpen={isDeletePopupOpen}
            isLoading={isLoading}
            onClose={closeAllModals}
            onSubmit={handleCardDelete}
          />
          <AddPlacePopup
            isOpen={isAddPlaceOpen}
            isLoading={isLoading}
            onClose={closeAllModals}
            onAddPlaceSubmit={handleAddPlace}
          />
        </CurrentUserContext.Provider>
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllModals}
          type={infoTooltipType}
        />
      </div>
    </div>
  );
}

export default App;
