// data/mockData.js
export const initialChats = [
    {
      wa_id: 'user_1',
      name: 'Alice Johnson',
      number: '+919876543210',
      messages: [
        {
          id: 'm1',
          text: 'Hey! How are you doing?',
          timestamp: Date.now() - 3600000,
          status: 'read',
          fromMe: false,
        },
        {
          id: 'm2',
          text: 'I\'m doing great! Just working on some projects. What about you?',
          timestamp: Date.now() - 3500000,
          status: 'delivered',
          fromMe: true,
        },
        {
          id: 'm3',
          text: 'That\'s awesome! I\'m also working on something interesting. We should catch up soon!',
          timestamp: Date.now() - 3400000,
          status: 'sent',
          fromMe: false,
        },
      ],
    },
    {
      wa_id: 'user_2',
      name: 'Bob Smith',
      number: '+918765432109',
      messages: [
        {
          id: 'm4',
          text: 'Are you coming to the meeting tomorrow?',
          timestamp: Date.now() - 1800000,
          status: 'sent',
          fromMe: false,
        },
        {
          id: 'm5',
          text: 'Yes, I\'ll be there at 10 AM sharp!',
          timestamp: Date.now() - 1700000,
          status: 'read',
          fromMe: true,
        },
      ],
    },
    {
      wa_id: 'user_3',
      name: 'Carol Davis',
      number: '+917654321098',
      messages: [
        {
          id: 'm6',
          text: 'Thanks for helping me with the project yesterday! I really appreciate all your hard work and dedication.',
          timestamp: Date.now() - 900000,
          status: 'delivered',
          fromMe: false,
        },
      ],
    },
    {
      wa_id: 'user_4',
      name: 'David Wilson',
      number: '+916543210987',
      messages: [],
    },
  ];