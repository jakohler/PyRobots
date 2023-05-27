import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PersistLogin(): JSX.Element {
  const [isLocation, setIsLocation] = useState(true);

  const location = useLocation();

  if (
    isLocation &&
    location.pathname !== "/register" &&
    location.pathname !== "/login"
  ) {
    setIsLocation(false);
  }
  return (
    <div>
      {isLocation ? (
        <Navigate to="/" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default PersistLogin;
