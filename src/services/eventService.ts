
import { eventDb, participantDb, DBEvent, DBParticipant } from '../db/eventDatabase';
import { toast } from '@/components/ui/sonner';

// Interface for the event information we expose to the UI
export interface Event {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  location: string;
  participants: number;
  image?: string;
}

// Interface for participant information we expose to the UI
export interface Participant {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  eventId: string;
}

// Convert database event to UI event with participant count
const mapDbEventToEvent = (dbEvent: DBEvent): Event => {
  const eventParticipants = participantDb.getByEventId(dbEvent.id);
  
  return {
    ...dbEvent,
    participants: eventParticipants.length
  };
};

// Event Service - Business logic for events
export const eventService = {
  // Get all events with participant counts
  getAllEvents: (): Event[] => {
    const dbEvents = eventDb.getAll();
    return dbEvents.map(mapDbEventToEvent);
  },
  
  // Get event by ID with participant count
  getEventById: (id: string): Event | null => {
    const dbEvent = eventDb.getById(id);
    if (!dbEvent) return null;
    
    return mapDbEventToEvent(dbEvent);
  },
  
  // Create a new event
  createEvent: (eventData: Omit<DBEvent, 'id' | 'createdAt'>): Event => {
    try {
      const newDbEvent = eventDb.create(eventData);
      return mapDbEventToEvent(newDbEvent);
    } catch (error) {
      toast.error("Failed to create event");
      throw error;
    }
  },
  
  // Update an event
  updateEvent: (id: string, eventData: Partial<Omit<DBEvent, 'id' | 'createdAt'>>): Event | null => {
    try {
      const updatedDbEvent = eventDb.update(id, eventData);
      if (!updatedDbEvent) {
        toast.error("Event not found");
        return null;
      }
      return mapDbEventToEvent(updatedDbEvent);
    } catch (error) {
      toast.error("Failed to update event");
      throw error;
    }
  },
  
  // Delete an event and its participants
  deleteEvent: (id: string): boolean => {
    try {
      const result = eventDb.delete(id);
      if (result) {
        toast.success("Event deleted successfully");
      } else {
        toast.error("Event not found");
      }
      return result;
    } catch (error) {
      toast.error("Failed to delete event");
      throw error;
    }
  },
  
  // Get events by department
  getEventsByDepartment: (department: string): Event[] => {
    const dbEvents = eventDb.getByDepartment(department);
    return dbEvents.map(mapDbEventToEvent);
  }
};

// Participant Service - Business logic for participants
export const participantService = {
  // Get all participants for an event
  getEventParticipants: (eventId: string): Participant[] => {
    return participantDb.getByEventId(eventId);
  },
  
  // Register a participant for an event
  registerParticipant: (name: string, eventId: string): { success: boolean; participant?: Participant } => {
    try {
      // Check if event exists
      const event = eventDb.getById(eventId);
      if (!event) {
        toast.error("Event not found");
        return { success: false };
      }
      
      // Check if already registered
      if (participantDb.isRegistered(name, eventId)) {
        toast.error("You are already registered for this event");
        return { success: false };
      }
      
      // Create email from name
      const email = name.toLowerCase().replace(/\s+/g, '.') + '@university.edu';
      
      // Register participant
      const participant = participantDb.create({
        name,
        email,
        eventId,
        registrationDate: new Date().toISOString()
      });
      
      toast.success("Successfully registered for the event");
      return { success: true, participant };
    } catch (error) {
      toast.error("Failed to register for event");
      return { success: false };
    }
  },
  
  // Unregister a participant from an event
  unregisterParticipant: (name: string, eventId: string): { success: boolean } => {
    try {
      // Find the participant by name and eventId
      const allParticipants = participantDb.getByEventId(eventId);
      const participant = allParticipants.find(p => p.name === name);
      
      if (!participant) {
        toast.error("You are not registered for this event");
        return { success: false };
      }
      
      // Delete the participant
      const result = participantDb.delete(participant.id);
      
      if (result) {
        toast.success("Successfully unregistered from the event");
      } else {
        toast.error("Failed to unregister from event");
      }
      
      return { success: result };
    } catch (error) {
      toast.error("Failed to unregister from event");
      return { success: false };
    }
  },
  
  // Get participants for CSV download
  getParticipantsForCSV: (eventId: string): { name: string; email: string; registrationDate: string }[] => {
    const participants = participantDb.getByEventId(eventId);
    return participants.map(({ name, email, registrationDate }) => ({
      name,
      email,
      registrationDate: new Date(registrationDate).toISOString().split('T')[0]
    }));
  },
  
  // Check if a user is registered for an event
  isRegistered: (name: string, eventId: string): boolean => {
    return participantDb.isRegistered(name, eventId);
  },
  
  // Get all registered events for a user
  getUserRegisteredEvents: (name: string): string[] => {
    const userRegistrations = participantDb.getAll().filter(p => p.name === name);
    return userRegistrations.map(registration => registration.eventId);
  }
};
