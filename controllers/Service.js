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

exports.getEditService = async (req, res, next) => {
  const cur_service2 = await Service.findByPk(req.params.id);
  res.render("service/editservice", { service: cur_service2 });
};

exports.postEditService = async (req, res, next) => {
  const cur_service = await Service.findByPk(req.params.id);
  cur_service.title = req.body.title;
  cur_service.description = req.body.description;
  cur_service.imageUrl =
    "http://localhost:5000/public/images/" + req.file.originalname;
  cur_service
    .save()
    .then(() => {
      res.redirect("/services");
    })
    .catch((error) => {
      res.json("Some error occured");
    });
};

exports.getDeleteService = (req, res, next) => {
  Service.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.redirect("/services");
    })
    .catch(() => res.send("Some error occured"));
};
