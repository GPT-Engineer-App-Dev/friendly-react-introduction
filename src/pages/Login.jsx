import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Heading, Flex } from "@chakra-ui/react";
import { SupabaseAuthUI, useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="background.800">
      <Box p={4} borderWidth="1px" borderRadius="lg" width="100%" maxWidth="md" bg="background.900" boxShadow="md">
        <Heading as="h2" size="lg" mb={4} color="text.100">Login</Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;