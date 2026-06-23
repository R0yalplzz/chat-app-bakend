const pageNotFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    sucess: false,
    message: "Page Not Found",
  });
};

export default pageNotFoundMiddleware;
