class EndpointsController {
  async welcome(_, res, next) {
    try {
      res.json({ status: "success", data: { welcome: { message: "Welcome to WWC Ecommerce API"} } });
    } catch(err) {
      next(err);
    }
  }

  async health_check(_, res, next) {
    try {
      res.json({status: "success", data: { server: { status: "ok" } } });
    } catch(err) {
      next(err);
    }
  }
}

export default new EndpointsController();