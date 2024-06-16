import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Events from "./pages/Events.jsx";
import Venues from "./pages/Venues.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button, Box, Flex, HStack, Avatar, Heading } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <Box width="100%" p={4} bg="background.900" boxShadow="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg" color="text.100">atics</Heading>
          <HStack spacing={4}>
            <Button as="a" href="/" variant="link" color="text.100">Home</Button>
            <Button as="a" href="/clients" variant="link" color="text.100">Clients</Button>
            <Button as="a" href="/analytics" variant="link" color="text.100">Analytics</Button>
            <Button as="a" href="/marketing" variant="link" color="text.100">Marketing</Button>
            <Button as="a" href="/reports" variant="link" color="text.100">Reports</Button>
            {session ? (
              <Button onClick={logout} bg="accent.yellow">Logout</Button>
            ) : (
              <Button as="a" href="/login" bg="accent.yellow">Login</Button>
            )}
            <Avatar name="User" src="https://bit.ly/broken-link" />
          </HStack>
        </Flex>
      </Box>
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