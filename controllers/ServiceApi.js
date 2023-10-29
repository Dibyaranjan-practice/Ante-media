const Service = require("./../models/Service");

exports.getApiAllService = async (req, res, next) => {
  res.json(await Service.findAll({ order: [["createdAt", "DESC"]], limit: 8 }));
};

exports.getApiServiceById = async (req, res, next) => {
  res.json(await Service.findByPk(req.params.id));
};
