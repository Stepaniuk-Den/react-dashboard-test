import { useDispatch, useSelector } from "react-redux";
import "./navbar.scss";
import {
  selectIsLoggedIn,
  selectIsModalOpen,
  selectUserName,
} from "../../redux/selectors";
import { logoutThunk } from "../../redux/Auth/AuthThunk";
import ModalSettings from "../modalSettings/ModalSettings";
import { toggleModal } from "../../redux/Auth/AuthSlice";
import { IoSettingsSharp } from "react-icons/io5";
import Button from "../button/Button";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserName);
  const isModalOpen = useSelector(selectIsModalOpen);

  const [exitIsOpen, setExitIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  const toggle = () => {
    if (!isAuth) return;
    dispatch(toggleModal());
  };

  const toggleExit = () => {
    setExitIsOpen(!exitIsOpen);
  };

  const backdropClick = (evt) => {
    if (evt.target === evt.currentTarget) setExitIsOpen(!exitIsOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
        <span>Dashboard</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="search" className="icon" />
        <img src="/app.svg" alt="app" className="icon" />
        <img src="/expand.svg" alt="expand" className="icon" />
        <div className="notifications">
          <img src="/notifications.svg" alt="notifications" />
          <span>1</span>
        </div>
        <div className="user">
          <p>
            Hi,<span> {user ? user : "   Anonymous"} !</span>
          </p>
          <button className="settings" onClick={toggle}>
            <IoSettingsSharp />
          </button>
          <div className="logoutContainer">
            <Button text="Logout" onClick={toggleExit}></Button>
            {exitIsOpen && (
              <div className="modalOverlay" onClick={backdropClick}>
                <div className="modal">
                  <p>Do you want to logout?</p>
                  <Button
                    text="Yes"
                    onClick={handleLogout}
                    className="exitBtn"
                  ></Button>
                  <Button
                    text="No"
                    onClick={toggleExit}
                    className="exitBtn"
                  ></Button>
                </div>
              </div>
            )}
          </div>
          {isModalOpen && <ModalSettings />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
