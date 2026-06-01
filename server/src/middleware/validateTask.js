export const validateTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Title cannot exceed 100 characters",
    });
  }

  next();
};