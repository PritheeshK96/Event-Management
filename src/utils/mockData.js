export const initialEvents = [
  {
    id: "event-1",
    title: "Global Tech Summit 2026",
    description: "Join industry leaders and developers worldwide to discuss the future of AI, quantum computing, and decentralized web technologies. Keynote speakers include leading researchers and product visionaries.",
    date: "2026-07-12",
    time: "09:00",
    location: "San Francisco Palace of Fine Arts, CA",
    category: "Technology",
    banner: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    price: 299,
    capacity: 500,
    checklist: [
      { id: "task-1-1", text: "Confirm catering services", completed: true },
      { id: "task-1-2", text: "Set up keynote stage visualizer", completed: true },
      { id: "task-1-3", text: "Send final badges print run", completed: false },
      { id: "task-1-4", text: "Brief volunteer team on logistics", completed: false }
    ],
    attendees: [
      { id: "att-1", name: "Alice Johnson", email: "alice@example.com", rsvp: "Going", ticketNumber: "TKT-10928-82" },
      { id: "att-2", name: "Bob Smith", email: "bob@example.com", rsvp: "Going", ticketNumber: "TKT-10928-83" },
      { id: "att-3", name: "Charlie Davis", email: "charlie@example.com", rsvp: "Maybe", ticketNumber: "TKT-10928-84" },
      { id: "att-4", name: "Diana Prince", email: "diana@example.com", rsvp: "Going", ticketNumber: "TKT-10928-85" }
    ]
  },
  {
    id: "event-2",
    title: "Neon Echoes Music Festival",
    description: "An evening of indie synthwave, dream pop, and digital art installations under the neon sky. Live performances by Echo Collider, Sunset Grid, and Dreamweaver.",
    date: "2026-07-18",
    time: "18:00",
    location: "The Grid Amphitheatre, Austin, TX",
    category: "Music",
    banner: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    price: 49,
    capacity: 1200,
    checklist: [
      { id: "task-2-1", text: "Soundcheck for main band", completed: false },
      { id: "task-2-2", text: "Deploy laser light rigs", completed: true },
      { id: "task-2-3", text: "Arrange food truck vendors", completed: true }
    ],
    attendees: [
      { id: "att-5", name: "Ethan Hunt", email: "ethan@example.com", rsvp: "Going", ticketNumber: "TKT-29018-01" },
      { id: "att-6", name: "Fiona Gallagher", email: "fiona@example.com", rsvp: "Going", ticketNumber: "TKT-29018-02" },
      { id: "att-7", name: "George Costanza", email: "george@example.com", rsvp: "Not Going", ticketNumber: "TKT-29018-03" }
    ]
  },
  {
    id: "event-3",
    title: "Culinary Masterclass: Modern Fusion",
    description: "Learn the secrets of modern gastronomy and plate presentations from Michelin-starred Chef Marcus Thorne. Hands-on experience preparing 3 signature dishes.",
    date: "2026-07-25",
    time: "11:00",
    location: "Taste Lab Studio, New York, NY",
    category: "Food",
    banner: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    price: 150,
    capacity: 25,
    checklist: [
      { id: "task-3-1", text: "Source organic ingredients", completed: true },
      { id: "task-3-2", text: "Sharpen prep knives", completed: true },
      { id: "task-3-3", text: "Print recipe manuals", completed: false }
    ],
    attendees: [
      { id: "att-8", name: "Hannah Abbott", email: "hannah@example.com", rsvp: "Going", ticketNumber: "TKT-31201-90" },
      { id: "att-9", name: "Ian Malcolm", email: "ian@example.com", rsvp: "Going", ticketNumber: "TKT-31201-91" }
    ]
  },
  {
    id: "event-4",
    title: "International Art Exhibition: Abstract Realism",
    description: "An exclusive showcase exploring the boundary where abstract aesthetics intersect with photorealism. Curated by the Modern Art Museum Board.",
    date: "2026-08-05",
    time: "10:00",
    location: "Metropolitan Gallery, Chicago, IL",
    category: "Art",
    banner: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    price: 0,
    capacity: 300,
    checklist: [
      { id: "task-4-1", text: "Position directional spotlighting", completed: true },
      { id: "task-4-2", text: "Place labels next to paintings", completed: true },
      { id: "task-4-3", text: "Send vip guest list invites", completed: true }
    ],
    attendees: [
      { id: "att-10", name: "Julia Roberts", email: "julia@example.com", rsvp: "Going", ticketNumber: "TKT-41029-44" },
      { id: "att-11", name: "Kevin Bacon", email: "kevin@example.com", rsvp: "Maybe", ticketNumber: "TKT-41029-45" },
      { id: "att-12", name: "Laura Croft", email: "laura@example.com", rsvp: "Going", ticketNumber: "TKT-41029-46" }
    ]
  },
  {
    id: "event-5",
    title: "AI Startup Pitch Night",
    description: "Watch 10 disruptive AI startups pitch their ideas to leading VCs and angel investors. Network with founders and find your next co-founder.",
    date: "2026-07-29",
    time: "18:30",
    location: "Online (Zoom / Gather.Town)",
    category: "Technology",
    banner: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    price: 0,
    capacity: 1000,
    checklist: [
      { id: "task-5-1", text: "Set up Zoom breakout rooms", completed: false },
      { id: "task-5-2", text: "Brief the judges on scoring rubrics", completed: true },
      { id: "task-5-3", text: "Conduct technical test with pitch presenters", completed: false }
    ],
    attendees: [
      { id: "att-13", name: "Miles Morales", email: "miles@example.com", rsvp: "Going", ticketNumber: "TKT-55102-12" },
      { id: "att-14", name: "Ned Leeds", email: "ned@example.com", rsvp: "Going", ticketNumber: "TKT-55102-13" },
      { id: "att-15", name: "Peter Parker", email: "peter@example.com", rsvp: "Going", ticketNumber: "TKT-55102-14" },
      { id: "att-16", name: "Gwen Stacy", email: "gwen@example.com", rsvp: "Going", ticketNumber: "TKT-55102-15" }
    ]
  }
];

export const categories = [
  "All",
  "Technology",
  "Music",
  "Food",
  "Art",
  "Business",
  "Sports",
  "Other"
];
