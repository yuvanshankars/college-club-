
// Simple in-memory database for events and participants

// Define the types for our database entities
export interface DBEvent {
  id: string;
  title: string;
  description: string;
  department: string;
  date: string;
  location: string;
  image?: string;
  createdAt: string;
}

export interface DBParticipant {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  eventId: string;
}

// In-memory storage
let events: DBEvent[] = [];
let participants: DBParticipant[] = [];

// Initialize with some sample data
const initializeDatabase = () => {
  const eventImages = [
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  ];

  // Sample events
  events = [
    {
      id: "1",
      title: "Programming Contest",
      description: "Annual coding competition for all CS students",
      department: "Computer Science",
      date: "2025-05-15",
      location: "CS Building, Room 101",
      image: eventImages[0],
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Business Ethics Seminar",
      description: "A discussion on ethical practices in business",
      department: "Business",
      date: "2025-05-20",
      location: "Business School Auditorium",
      image: eventImages[1],
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "Engineering Expo",
      description: "Showcase of student engineering projects",
      department: "Engineering",
      date: "2025-06-10",
      location: "Engineering Building",
      image: eventImages[2],
      createdAt: new Date().toISOString()
    }
  ];

  // Sample participants
  participants = [
    {
      id: "p1",
      name: "John Smith",
      email: "john.smith@university.edu",
      registrationDate: new Date().toISOString(),
      eventId: "1"
    },
    {
      id: "p2",
      name: "Emma Johnson",
      email: "emma.johnson@university.edu",
      registrationDate: new Date().toISOString(),
      eventId: "1"
    },
    {
      id: "p3",
      name: "Michael Brown",
      email: "michael.brown@university.edu",
      registrationDate: new Date().toISOString(),
      eventId: "2"
    }
  ];
};

// Call initialize function
initializeDatabase();

// CRUD Operations for Events
export const eventDb = {
  // Get all events
  getAll: (): DBEvent[] => {
    return [...events];
  },
  
  // Get event by ID
  getById: (id: string): DBEvent | undefined => {
    return events.find(event => event.id === id);
  },
  
  // Create a new event
  create: (eventData: Omit<DBEvent, 'id' | 'createdAt'>): DBEvent => {
    const newId = String(events.length + 1);
    const newEvent: DBEvent = {
      id: newId,
      ...eventData,
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    return newEvent;
  },
  
  // Update an event
  update: (id: string, eventData: Partial<Omit<DBEvent, 'id' | 'createdAt'>>): DBEvent | null => {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return null;
    
    events[index] = { ...events[index], ...eventData };
    return events[index];
  },
  
  // Delete an event
  delete: (id: string): boolean => {
    const initialLength = events.length;
    events = events.filter(event => event.id !== id);
    
    // Also delete all participants for this event
    participants = participants.filter(participant => participant.eventId !== id);
    
    return events.length < initialLength;
  },
  
  // Get events by department
  getByDepartment: (department: string): DBEvent[] => {
    return events.filter(event => event.department === department);
  }
};

// CRUD Operations for Participants
export const participantDb = {
  // Get all participants
  getAll: (): DBParticipant[] => {
    return [...participants];
  },
  
  // Get participant by ID
  getById: (id: string): DBParticipant | undefined => {
    return participants.find(participant => participant.id === id);
  },
  
  // Get participants by event ID
  getByEventId: (eventId: string): DBParticipant[] => {
    return participants.filter(participant => participant.eventId === eventId);
  },
  
  // Create a new participant
  create: (participantData: Omit<DBParticipant, 'id'>): DBParticipant => {
    const newId = `p${participants.length + 1}`;
    const newParticipant: DBParticipant = {
      id: newId,
      ...participantData
    };
    
    participants.push(newParticipant);
    return newParticipant;
  },
  
  // Update a participant
  update: (id: string, participantData: Partial<Omit<DBParticipant, 'id'>>): DBParticipant | null => {
    const index = participants.findIndex(participant => participant.id === id);
    if (index === -1) return null;
    
    participants[index] = { ...participants[index], ...participantData };
    return participants[index];
  },
  
  // Delete a participant
  delete: (id: string): boolean => {
    const initialLength = participants.length;
    participants = participants.filter(participant => participant.id !== id);
    return participants.length < initialLength;
  },
  
  // Check if a participant is registered for an event
  isRegistered: (name: string, eventId: string): boolean => {
    return participants.some(
      participant => participant.name === name && participant.eventId === eventId
    );
  }
};
