const Service = require("./../models/Service");

exports.getApiAllService = async (req, res, next) => {
  res.json(await Service.findAll());
};

exports.getApiServiceById = async (req, res, next) => {
  res.json(await Service.findByPk(req.params.id));
};
