import User from "../models/User.js";

/*READ*/

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.friends.map((friend) => {
        return User.findById(friend);
      })
    );

    const formattedFriends = friends.map((friend) => {
      return {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*UPDATE*/

export const addRemoveFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friend = await User.findById(req.body.friendId);

    if (user.friends.includes(req.body.friendId)) {
      await user.updateOne({ $pull: { friends: req.body.friendId } });
      await friend.updateOne({ $pull: { friends: req.params.id } });
      res.status(200).json("Friend removed");
    } else {
      await user.updateOne({ $push: { friends: req.body.friendId } });
      await friend.updateOne({ $push: { friends: req.params.id } });
      res.status(200).json("Friend added");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
