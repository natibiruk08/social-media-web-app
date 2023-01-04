import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  //   createPost,
  //   updatePost,
  //   deletePost,
} from "../controllers/posts.js";
import { login } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/*UPDATE*/
router.patch("/:id/like", verifyToken, likePost);

export default router;
