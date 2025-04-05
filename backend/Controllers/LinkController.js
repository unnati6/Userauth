import Link from '../Model/LinkModel.js';

// Add Link
export const addLink = async (req, res) => {
  const { title, url } = req.body;
  const userId = req.user._id;

  try {
    const count = await Link.countDocuments({ user: userId });
    const newLink = await Link.create({ user: userId, title, url, order: count });
    res.status(201).json({ message: "Link added", link: newLink });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Links for Logged-in User
export const getUserLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user._id }).sort({ order: 1 });
    res.status(200).json({ links });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Link
export const updateLink = async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;

  try {
    const link = await Link.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, url },
      { new: true }
    );
    res.status(200).json({ message: "Link updated", link });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Link
export const deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    await Link.findOneAndDelete({ _id: id, user: req.user._id });
    res.status(200).json({ message: "Link deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reorder Links
export const reorderLinks = async (req, res) => {
  const { reorderedLinks } = req.body;

  try {
    for (let i = 0; i < reorderedLinks.length; i++) {
      await Link.findOneAndUpdate(
        { _id: reorderedLinks[i], user: req.user._id },
        { order: i }
      );
    }

    res.status(200).json({ message: "Links reordered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
