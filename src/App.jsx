import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Events from "./pages/Events.jsx";
import Venues from "./pages/Venues.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <div>
        {session ? (
          <Button onClick={logout} bg="accent.yellow">Logout</Button>
        ) : (
          <Button as="a" href="/login" bg="accent.yellow">Login</Button>
        )}
      </div>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/venues" element={<Venues />} />
      </Routes>
    </Router>
  );
}

export default App;