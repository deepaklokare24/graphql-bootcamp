const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 36,
    employed: true,
    gpa: null,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 28,
    employed: false,
    gpa: 7.5,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 42,
    employed: false,
    gpa: 9.0,
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    age: 30,
    employed: true,
    gpa: 8.5,
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    age: 34,
    employed: true,
    gpa: 8.0,
  },
  {
    id: "6",
    name: "David Wilson",
    email: "david.wilson@example.com",
    age: 26,
    employed: false,
    gpa: 7.0,
  },
  {
    id: "7",
    name: "Emily Thompson",
    email: "emily.thompson@example.com",
    age: 38,
    employed: true,
    gpa: 8.2,
  },
  {
    id: "8",
    name: "Frank Miller",
    email: "frank.miller@example.com",
    age: 29,
    employed: false,
    gpa: 8.8,
  },
  {
    id: "9",
    name: "Grace Wilson",
    email: "grace.wilson@example.com",
    age: 35,
    employed: false,
    gpa: 8.4,
  },
  {
    id: "10",
    name: "John Smith",
    email: "john.smith@example.com",
    age: 36,
    employed: false,
    gpa: 8.9,
  },
];

const posts = [
  {
    id: "1",
    title: "GraphQL Tutorial",
    body: "Learn GraphQL with this comprehensive tutorial",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Node.js and Express.js",
    body: "Learn Node.js and Express.js for building RESTful APIs",
    published: false,
    author: "2",
  },
  {
    id: "3",
    title: "React.js and GraphQL",
    body: "Learn React.js and GraphQL for building dynamic web applications",
    published: true,
    author: "1",
  },
  {
    id: "4",
    title: "Python and GraphQL",
    body: "Learn Python and GraphQL for building powerful web applications",
    published: true,
    author: "3",
  },
  {
    id: "5",
    title: "GraphQL and MongoDB",
    body: "Learn GraphQL and MongoDB for building real-time applications",
    published: true,
    author: "5",
  },
];

const comments = [
  {
    id: "1",
    text: "Great tutorial!",
    postId: "1",
    userId: "1",
  },
  {
    id: "2",
    text: "I'm enjoying it so far.",
    postId: "1",
    userId: "1",
  },
  {
    id: "3",
    text: "I'd love to learn more about this topic.",
    postId: "2",
    userId: "3",
  },
  {
    id: "4",
    text: "I agree with you.",
    postId: "2",
    userId: "4",
  },
  {
    id: "5",
    text: "I think this is a great way to learn.",
    postId: "3",
    userId: "3",
  },
];

const db = { users, posts, comments };

export default db;
