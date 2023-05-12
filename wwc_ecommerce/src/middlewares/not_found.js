export default async (req, res, next) => {
  try {
    res.status(404).json({ status: 'error', message: `Page ${req.path} not found` });
  } catch(err) {
    next(err);
  }
}