import { useState } from "react";
import { Container, Text, VStack, Box, Button, Input } from "@chakra-ui/react";
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Venue Management</Text>
        <VStack spacing={4}>
          <Input placeholder="Venue Name" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
          <Input placeholder="Venue Capacity" value={venueCapacity} onChange={(e) => setVenueCapacity(e.target.value)} />
          <Input placeholder="Venue Type" value={venueType} onChange={(e) => setVenueType(e.target.value)} />
          <Button onClick={handleAddVenue}>Add Venue</Button>
          <Box>
            {venuesLoading ? <Text>Loading...</Text> : venues.map((venue) => (
              <Box key={venue.id} p={4} borderWidth="1px" borderRadius="lg" bg="accent.purple">
                <Text>Name: {venue.name}</Text>
                <Text>Capacity: {venue.capacity}</Text>
                <Text>Type: {venue.type}</Text>
                <Button onClick={() => deleteVenueMutation.mutate(venue.id)}>Delete</Button>
              </Box>
            ))}
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Venues;