import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
