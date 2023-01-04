import Post from "../models/Post.js";

/*CREATE */

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
    });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(409).json(err);
  }
};

/*READ */

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const post = await Post.find({ userId: req.params.userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

/*UPDATE */

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if (post.likes.has(userId)) {
      post.likes.delete(userId);
    } else {
      post.likes.set(req.body.userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: post,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json(err);
  }
};
