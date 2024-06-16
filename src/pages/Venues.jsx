import { useState } from "react";
import { Container, Text, VStack, Box, Button, Input, Flex, Heading } from "@chakra-ui/react";
import { useVenues, useAddVenue, useDeleteVenue } from "../integrations/supabase/index.js";

const Venues = () => {
  const [venueName, setVenueName] = useState("");
  const [venueCapacity, setVenueCapacity] = useState("");
  const [venueType, setVenueType] = useState("");

  const { data: venues, isLoading: venuesLoading } = useVenues();
  const addVenueMutation = useAddVenue();
  const deleteVenueMutation = useDeleteVenue();

  const handleAddVenue = () => {
    addVenueMutation.mutate({ name: venueName, capacity: venueCapacity, type: venueType });
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="background.800">
      <VStack spacing={4}>
        <Heading size="lg" color="text.100">Venue Management</Heading>
        <VStack spacing={4}>
          <Input placeholder="Venue Name" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
          <Input placeholder="Venue Capacity" value={venueCapacity} onChange={(e) => setVenueCapacity(e.target.value)} />
          <Input placeholder="Venue Type" value={venueType} onChange={(e) => setVenueType(e.target.value)} />
          <Button onClick={handleAddVenue} bg="accent.yellow">Add Venue</Button>
          <Box>
            {venuesLoading ? <Text color="text.200">Loading...</Text> : venues.map((venue) => (
              <Box key={venue.id} p={4} borderWidth="1px" borderRadius="lg" bg="background.900" boxShadow="md" mt={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text color="text.100">Name: {venue.name}</Text>
                  <Text color="text.200">Capacity: {venue.capacity}</Text>
                  <Text color="text.100">Type: {venue.type}</Text>
                  <Button onClick={() => deleteVenueMutation.mutate(venue.id)} variant="link" color="accent.red">Delete</Button>
                </Flex>
              </Box>
            ))}
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Venues;