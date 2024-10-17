const Query = {
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
  users: (parent, args, ctx, info) => {
    const { db } = ctx;
    if (!args?.searchStr) {
      return db.users;
    }

    return db.users.filter((user) =>
      user.name.toLowerCase().includes(args?.searchStr?.toLowerCase())
    );
  },
  posts: (parent, args, ctx, info) => {
    const { db } = ctx;
    if (!args?.searchStr) {
      return db.posts;
    }
    return db.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(args?.searchStr?.toLowerCase()) ||
        post.body.toLowerCase().includes(args?.searchStr?.toLowerCase())
    );
  },
  comments: (parent, args, ctx, info) => {
    const { db } = ctx;
    if (!args?.postId) {
      return db.comments;
    }
    return db.comments.filter((comment) => comment.postId === args.postId);
  },
};

export default Query;
