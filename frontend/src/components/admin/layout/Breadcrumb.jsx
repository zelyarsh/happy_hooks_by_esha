import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

function Breadcrumb() {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((item) => item !== "");

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">

      <Link
        to="/admin/dashboard"
        className="flex items-center gap-2 hover:text-pink-500 transition"
      >
        <FaHome />
        Dashboard
      </Link>

      {pathnames.slice(1).map((value, index) => {
        const to =
          "/" + pathnames.slice(0, index + 2).join("/");

        const isLast =
          index === pathnames.slice(1).length - 1;

        return (
          <div
            key={to}
            className="flex items-center gap-2"
          >
            <FaChevronRight className="text-xs" />

            {isLast ? (
              <span className="capitalize font-semibold text-pink-500">
                {value.replace("-", " ")}
              </span>
            ) : (
              <Link
                to={to}
                className="capitalize hover:text-pink-500 transition"
              >
                {value.replace("-", " ")}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;