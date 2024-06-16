import { useState } from "react";
import { Container, Text, VStack, Box, Button, Input, Select, Flex, Heading, Badge } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { useVenues } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Events = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: venues, isLoading: venuesLoading } = useVenues();

  const { session } = useSupabaseAuth();
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const handleAddEvent = () => {
    if (session) {
      addEventMutation.mutate({ name: eventName, date: eventDate, venue: eventVenue, created_by: session.user.id });
    } else {
      console.error("User is not authenticated");
    }
  };

  const handleUpdateEvent = () => {
    if (session && editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, name: eventName, date: eventDate, venue: eventVenue });
      setEditingEvent(null);
    } else {
      console.error("User is not authenticated or no event is being edited");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventName(event.name);
    setEventDate(event.date);
    setEventVenue(event.venue);
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="background.800">
      <VStack spacing={4}>
        <Heading size="lg" color="text.100">Event Management</Heading>
        <VStack spacing={4}>
          <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <Input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          <Select placeholder="Select Venue" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)}>
            {venues && venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </Select>
          {editingEvent ? (
            <Button onClick={handleUpdateEvent} bg="accent.yellow">Update Event</Button>
          ) : (
            <Button onClick={handleAddEvent} bg="accent.yellow">Add Event</Button>
          )}
          <Box>
            {eventsLoading ? <Text color="text.200">Loading...</Text> : (
              venuesLoading ? <Text color="text.200">Loading venues...</Text> : events.map((event) => (
                <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" bg="background.900" boxShadow="md" mt={2}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text color="text.100">Name: {event.name}</Text>
                    <Text color="text.200">Date: {event.date}</Text>
                    <Text color="text.100">Venue: {venues.find(v => v.id === event.venue)?.name || "Unknown"}</Text>
                    {session && session.user.id === event.created_by && (
                      <>
                        <Button onClick={() => handleEditEvent(event)} variant="link" color="accent.green">Edit</Button>
                        <Button onClick={() => deleteEventMutation.mutate(event.id)} variant="link" color="accent.red">Delete</Button>
                      </>
                    )}
                  </Flex>
                </Box>
              ))
            )}
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Events;