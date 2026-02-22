// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext";

// function Root() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Wait ONE browser paint, then show app
//     requestAnimationFrame(() => {
//       setReady(true);
//     });
//   }, []);

//   return (
//     <div className={ready ? "app-visible" : "app-hidden"}>
//       <AuthProvider>
//         <CartProvider>
//           <App />
//         </CartProvider>
//       </AuthProvider>
//     </div>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Root />);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);