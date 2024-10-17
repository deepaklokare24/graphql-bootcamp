import { v4 as uuidv4 } from "uuid";

const Mutation = {
  creaetUser: (parent, args, ctx, info) => {
    const { name, email, age, employed, gpa } = args.payload;
    const { db } = ctx;
    const emailTaken = db.users.some((user) => user.email === email);

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

    db.users.push(newUser);

    return newUser;
  },
  deleteUser: (parent, args, ctx, info) => {
    const { userId } = args;
    let { db } = ctx;
    const userIndex = db.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found.");
    }
    const deletedUser = db.users.splice(userIndex, 1);

    // Remove all the posts for this user
    db.posts = db.posts.filter((post) => {
      const condition = post.author !== userId;
      if (!condition) {
        // Remove all the comments for this post
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }
      return condition;
    });

    // Remove all the comments for this user
    db.comments = db.comments.filter((comment) => comment.userId !== userId);

    return deletedUser[0];
  },
  createPost: (parent, args, ctx, info) => {
    const { title, body, published, authorId } = args.payload;
    const { db } = ctx;
    const authorExists = db.users.some((user) => user.id === authorId);

    if (!authorExists) {
      throw new Error("Author not found.");
    }

    const newPost = {
      id: uuidv4(),
      title,
      body,
      published,
      author: authorId,
      comments: [],
    };
    db.posts.push(newPost);
    return newPost;
  },
  deletePost: (parent, args, ctx, info) => {
    const { postId } = args;
    let { db } = ctx;
    const postIndex = db.posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      throw new Error("Post not found.");
    }

    const deletedPost = db.posts.splice(postIndex, 1);
    // Remove all the comments for this post
    db.comments = db.comments.filter((comment) => comment.postId !== postId);
    return deletedPost[0];
  },
  createComment: (parent, args, ctx, info) => {
    const { text, userId, postId } = args.payload;
    const { db } = ctx;
    const userExists = db.users.some((user) => user.id === userId);

    if (!userExists) {
      throw new Error("User not found.");
    }

    const postExists = db.posts.some(
      (post) => post.id === postId && post.published === true
    );

    if (!postExists) {
      throw new Error("Post not found.");
    }

    const newComment = {
      id: uuidv4(),
      text,
      userId,
      postId,
    };
    db.comments.push(newComment);
    return newComment;
  },
  deleteComment: (parent, args, ctx, info) => {
    const { commentId } = args;
    const { db } = ctx;
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex === -1) {
      throw new Error("Comment not found.");
    }
    const deletedComment = db.comments.splice(commentIndex, 1);

    return deletedComment[0];
  },
};

export default Mutation;
