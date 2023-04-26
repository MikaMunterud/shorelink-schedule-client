import { useState } from "react";
import MenuList from "./MenuList";
import MenuIcons from "./MenuIcons";
import { Link, useNavigate } from "react-router-dom";
import "../../sass/navbar/Navbar.scss";
import { MdOutlineSettings } from "react-icons/md";

export default function Navbar() {
  const [menuList, setMenuList] = useState("");
  const [menu, setMenu] = useState(true);
  const [cross, setCross] = useState(false);
  const navigate = useNavigate();

  function toggleMenu() {
    if (menu) {
      setMenu(false);
      setCross(true);
      setMenuList("visible");
    } else {
      hideMenu();
    }
  }

  function hideMenu() {
    setCross(false);
    setMenu(true);
    setMenuList("");

    /*
     * This closes all details lists in the menu when closing.
     */
    const details = document.querySelectorAll("details");
    details.forEach(function (list) {
      list.removeAttribute("open");
    });
  }

  const goToHomepage = function () {
    navigate("/");
  };

  function redirect(endpoint) {
    navigate(`${endpoint}`);
  }

  return (
    <header className="fixedHeader">
      <div className="relativeHeader">
        <div className="navIcons">
          <nav className="navIcons_menu">
            <MenuIcons toggleMenu={toggleMenu} menu={menu} cross={cross} />

            <MenuList menuList={menuList} hideMenu={hideMenu} />
          </nav>
        </div>
        <img
          className="companyLogo"
          src={"https://icicathy.sirv.com/shorelink_white.png"}
          alt={"company logo"}
          width={"400px"}
          height={"auto"}
          onClick={goToHomepage}
        />
        <div className="userSettingsIcon" onClick={hideMenu}>
          <Link to={"/userSettings"} className="userSettingsIcon_link">
            <MdOutlineSettings className="userSettingsIcon_icon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
