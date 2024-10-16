import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

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

const typeDefs = `
type User {
    id: ID!
    name: String!
    email: String
    age: Int
    employed: Boolean!
    gpa: Float
    posts: [Post!]!
    comments: [Comment!]!
}
type Product {
    id: ID!
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
}

type Comment {
    id: ID!
    text: String!
    postId: Int!
    userId: Int!
    author: User!
    post: Post!
}

type Query {
    hello: String!
    message: String!
    location: String!
    bio: String!
    person: User!
    product: Product!
    post: Post!
    greeting(name: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    users(searchStr: String): [User!]!
    posts(searchStr: String): [Post!]!
    comments(postId: ID): [Comment!]!
 }

type Mutation {
    creaetUser(name: String!, email: String!, age: Int, employed: Boolean!, gpa: Float): User!
}
`;

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
    message: () => "This is a test message",
    location: () => "Davangere",
    bio: () => "I am a software engineer living in Davangere, India",
    person: () => {
      return {
        id: "123",
        name: "Deepak",
        email: "deepak.l@exmaple.com",
        age: 36,
        employed: true,
        gpa: 7.5,
      };
    },
    product: () => {
      return {
        id: "456",
        title: "Product A",
        price: 99.99,
        releaseYear: 2022,
        rating: 4.5,
        inStock: false,
      };
    },
    post: () => {
      return {
        id: "789",
        title: "My First Post",
        body: "Hello, World!",
        published: true,
        author: "3",
      };
    },
    greeting: (parent, args, ctx, info) => {
      let { name } = args;

      if (name) {
        return `Hello, ${name}!`;
      } else {
        return "Hello, World!";
      }
    },
    add: (parent, args) => {
      const { numbers } = args;
      return numbers.reduce((a, c) => a + c);
    },
    grades: () => [85, 90, 95, 78, 82],
    users: (parent, args) => {
      if (!args?.searchStr) {
        return users;
      }

      return users.filter((user) =>
        user.name.toLowerCase().includes(args?.searchStr?.toLowerCase())
      );
    },
    posts: (parent, args) => {
      if (!args?.searchStr) {
        return posts;
      }
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args?.searchStr?.toLowerCase()) ||
          post.body.toLowerCase().includes(args?.searchStr?.toLowerCase())
      );
    },
    comments: (parent, args) => {
      console.log("Post id: ", args.postId);
      if (!args?.postId) {
        return comments;
      }
      return comments.filter((comment) => comment.postId === args.postId);
    },
  },
  Post: {
    author: (parent) => {
      return users.find((user) => user.id === parent.author);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.postId === parent.id);
    },
  },
  User: {
    posts: (parent) => {
      return posts.filter((post) => post.author === parent.id);
    },
    comments: (parent) => {
      return comments.filter((comment) => comment.userId === parent.id);
    },
  },
  Comment: {
    author: (parent) => {
      return users.find((user) => user.id === parent.userId);
    },
    post: (parent) => {
      return posts.find((post) => post.id === parent.postId);
    },
  },
  Mutation: {
    creaetUser: (parent, args, ctx, info) => {
      console.log("Arguments: " + JSON.stringify(args));
      const { name, email, age, employed, gpa } = args;

      const emailTaken = users.some((user) => user.email === email);

      if (emailTaken) {
        throw new Error("Email already taken.");
      }

      const newUser = {
        id: uuidv4(),
        name,
        email,
        age,
        employed,
        gpa,
        posts: [],
        comments: [],
      };

      users.push(newUser);

      return newUser;
    },
  },
};

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

const server = createServer(yoga);

server.listen({ port: 4000 }, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
