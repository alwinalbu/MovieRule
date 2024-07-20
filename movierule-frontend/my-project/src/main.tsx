import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "./config/constants";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";


if (!clientId) {
  throw new Error(
    "VITE_APP_GOOGLE_CLIENT_ID is not defined in the environment."
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found in the document.');
}

const root = createRoot(rootElement);

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <Toaster position="top-center" />
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </GoogleOAuthProvider>
);
