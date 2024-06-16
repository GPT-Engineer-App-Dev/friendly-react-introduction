import { useState } from "react";
import { Container, Text, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Input, Select } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from "../integrations/supabase/index.js";

const Index = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueCapacity, setVenueCapacity] = useState("");
  const [venueType, setVenueType] = useState("");

  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: venues, isLoading: venuesLoading } = useVenues();

  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const addVenueMutation = useAddVenue();
  const updateVenueMutation = useUpdateVenue();
  const deleteVenueMutation = useDeleteVenue();

  const handleAddEvent = () => {
    addEventMutation.mutate({ name: eventName, date: eventDate, venue: eventVenue });
  };

  const handleAddVenue = () => {
    addVenueMutation.mutate({ name: venueName, capacity: venueCapacity, type: venueType });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Event and Venue Management</Text>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Events</Tab>
            <Tab>Venues</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={4}>
                <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <Input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                <Select placeholder="Select Venue" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)}>
                  {venues && venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                  ))}
                </Select>
                <Button onClick={handleAddEvent}>Add Event</Button>
                <Box>
                  {eventsLoading ? <Text>Loading...</Text> : events.map((event) => (
                    <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg">
                      <Text>Name: {event.name}</Text>
                      <Text>Date: {event.date}</Text>
                      <Text>Venue: {venues.find(v => v.id === event.venue)?.name || "Unknown"}</Text>
                      <Button onClick={() => deleteEventMutation.mutate(event.id)}>Delete</Button>
                    </Box>
                  ))}
                </Box>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4}>
                <Input placeholder="Venue Name" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
                <Input placeholder="Venue Capacity" value={venueCapacity} onChange={(e) => setVenueCapacity(e.target.value)} />
                <Input placeholder="Venue Type" value={venueType} onChange={(e) => setVenueType(e.target.value)} />
                <Button onClick={handleAddVenue}>Add Venue</Button>
                <Box>
                  {venuesLoading ? <Text>Loading...</Text> : venues.map((venue) => (
                    <Box key={venue.id} p={4} borderWidth="1px" borderRadius="lg">
                      <Text>Name: {venue.name}</Text>
                      <Text>Capacity: {venue.capacity}</Text>
                      <Text>Type: {venue.type}</Text>
                      <Button onClick={() => deleteVenueMutation.mutate(venue.id)}>Delete</Button>
                    </Box>
                  ))}
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Index;