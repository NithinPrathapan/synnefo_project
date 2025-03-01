import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import App from "./App.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider 
    appearance={{
      baseTheme: dark,
      primaryColor: "#FFA500",
    }}
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl="/"
  >
    <App />
  </ClerkProvider>
);
