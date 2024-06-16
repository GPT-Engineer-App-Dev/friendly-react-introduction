import { useState } from "react";
import { Container, Text, VStack, Box, Button, Input, Select } from "@chakra-ui/react";
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
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Event Management</Text>
        <VStack spacing={4}>
          <Input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <Input type="date" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          <Select placeholder="Select Venue" value={eventVenue} onChange={(e) => setEventVenue(e.target.value)}>
            {venues && venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </Select>
          {editingEvent ? (
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          ) : (
            <Button onClick={handleAddEvent}>Add Event</Button>
          )}
          <Box>
            {eventsLoading ? <Text>Loading...</Text> : (
              venuesLoading ? <Text>Loading venues...</Text> : events.map((event) => (
                <Box key={event.id} p={4} borderWidth="1px" borderRadius="lg" bg="accent.purple">
                  <Text>Name: {event.name}</Text>
                  <Text>Date: {event.date}</Text>
                  <Text>Venue: {venues.find(v => v.id === event.venue)?.name || "Unknown"}</Text>
                  {session && session.user.id === event.created_by && (
                    <>
                      <Button onClick={() => handleEditEvent(event)}>Edit</Button>
                      <Button onClick={() => deleteEventMutation.mutate(event.id)}>Delete</Button>
                    </>
                  )}
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