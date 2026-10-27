import { createRoot } from "react-dom/client";
import Routes from "./routes";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import Theme from "@web-core/component/src/theme/Theme";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Missing root element "root".');
}

createRoot(rootElement).render(
  <Theme>
    <Router>
      <Routes />
    </Router>
  </Theme>
);

serviceWorker.unregister();
