import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function DetailsList({ list, hideMenu, heading }) {
  return (
    <details className="menuDetails">
      <summary className="menuDetails_summary">
        <h2>{heading}</h2>
        <IoIosArrowForward className="summaryArrow" />
      </summary>

      <ul className="menuDetails_list">
        {list.map(function (item, index) {
          return (
            <li
              className="menuDetails_list_item"
              onClick={hideMenu}
              key={index}
            >
              <Link className="menuList_item_link" to={`/${item.link}`}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
