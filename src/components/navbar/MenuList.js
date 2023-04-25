import { Link, useNavigate } from "react-router-dom";
import data from "../../data.json";
import DetailsList from "../listTypes/DetailsList";
import ButtonIcon from "../buttons/ButtonIcon";
import { MdLogout } from "react-icons/md";
import { useContext } from "react";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import Swal from "sweetalert2";
export default function MenuList({ menuList, searchBox, hideMenu }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function logout() {
    const confirmLogout = await Swal.fire({
      title: "Logga ut?",
      text: `Är du säker på att du vill logga ut?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ja!",
      cancelButtonText: "Nej!",
      reverseButtons: true,
    });
    if (confirmLogout.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/authentication/logout`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseMessage = await response.text();

        if (response.status === 400) {
          await Swal.fire({
            icon: "error",
            text: responseMessage,
          });
          return;
        }

        if (response.status === 401) {
          localStorage.removeItem("loggedInUser");
          setIsLoggedIn(false);
          return;
        }

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            text: responseMessage,
          });
          localStorage.removeItem("loggedInUser");
          navigate("/");
          setIsLoggedIn(false);
          return;
        }
      } catch (FetchError) {
        await Swal.fire({
          icon: "error",
          text: "Något gick fel, gick inte att ansluta till servern!",
        });
        setIsLoggedIn(false);
      }
    } else {
      await Swal.fire(
        "Cancelled",
        `Utloggningen har cancellerats 🥳!`,
        "error"
      );
      return;
    }
  }

  return (
    <ul
      className={`menuList ${menuList} ${
        menuList === "visible" && searchBox ? "searchBox" : ""
      }`}
    >
      <li className="menuList_item">
        <Link className="menuList_item_link" to={"/"} onClick={hideMenu}>
          <h2>Startsida</h2>
        </Link>
      </li>
      <li className="menuList_item">
        <DetailsList
          list={data.calenderViews}
          hideMenu={hideMenu}
          localLinks={true}
          heading={"Kalendrar"}
        />
      </li>

      {isLoggedIn ? (
        <li className="menuList_item icons" onClick={hideMenu}>
          <ButtonIcon handleClick={logout} icon={<MdLogout />} />
        </li>
      ) : null}
    </ul>
  );
}
