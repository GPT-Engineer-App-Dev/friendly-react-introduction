import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Welcome to the Management System</Text>
        <Button as={Link} to="/events" bg="accent.yellow">Manage Events</Button>
        <Button as={Link} to="/venues" bg="accent.yellow">Manage Venues</Button>
      </VStack>
    </Container>
  );
};

export default Index;