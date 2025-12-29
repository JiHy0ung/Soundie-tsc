import { Route, Routes } from "react-router";
import "./App.css";
import React, { Suspense, useEffect } from "react";
import useExchangeToken from "./hooks/useExchangeToken";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const LandingPage = React.lazy(() => import("./pages/LandingPage/LandingPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
  () => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistPage = React.lazy(
  () => import("./pages/PlaylistPage/PlaylistPage")
);
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
      localStorage.removeItem("code_verifier");
    }
  }, [code, codeVerifier]);

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist" element={<PlaylistPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
