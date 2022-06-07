import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./components/routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./components/utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from ".";
export default function AppRouter() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }, i) => (
        <Route path={path} element={<Component />} exact={true} key={i} />
      ))}
      <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }, i) => (
        <Route path={path} element={<Component />} exact={true} key={i} />
      ))}

      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
}
