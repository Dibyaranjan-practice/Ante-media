const Clientele = require("./../models/Clientele");

exports.getApiAllClientele = async (req, res, next) => {
  res.json(
    await Clientele.findAll({ order: [["createdAt", "DESC"]], limit: 8 })
  );
};

exports.getApiClienteleById = async (req, res, next) => {
  res.json(await Clientele.findByPk(req.params.id));
};
