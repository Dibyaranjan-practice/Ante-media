const Service = require("./../models/Service");

exports.getAddService = (req, res, next) => {
  res.render("service/addservice");
};

exports.postAddService = (req, res, next) => {
  Service.create({
    title: req.body.title,
    description: req.body.description,
    imageUrl: "http://localhost:5000/public/images/" + req.file.originalname,
  });
  res.redirect("/services/add-service");
};

exports.getAllService = async (req, res, next) => {
  const services = await Service.findAll();
  res.render("service/displayservice", { services });
};

exports.getEditService = (req, res, next) => {
  res.render("service/editservice");
};

exports.postEditService = (req, res, next) => {
  res.render("service/editservice");
};

exports.getDeleteService = (req, res, next) => {
  Service.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect("/services");
    })
    .catch(() => res.send("Some error occured"));
};
