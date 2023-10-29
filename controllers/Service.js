const Service = require("./../models/Service");
const deleteFile = require("./../utils/deleteFile");
const path = require("path");
const { validationResult } = require("express-validator");

exports.getAddService = (req, res, next) => {
  res.render("service/addservice", {
    possibleErrors: { title: "", description: "" },
  });
};

exports.postAddService = (req, res, next) => {
  const possibleErrors = { title: "", description: "" };
  let errors = validationResult(req);
  if (errors.isEmpty()) {
    Service.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: path.join(
        process.env.DOMAIN_PATH,
        "public",
        "images",
        req.file.filename
      ),
    })
      .then(() => {
        return res.render("service/addservice", { possibleErrors });
      })
      .catch(() => res.send("error occured"));
  } else {
    errors = errors.errors;
    errors.forEach((e) => {
      possibleErrors[e.path] = e.msg;
    });
    res.render("service/addservice", { possibleErrors });
  }
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
  deleteFile(cur_service.imageUrl);
  cur_service.title = req.body.title;
  cur_service.description = req.body.description;
  cur_service.imageUrl = path.join(
    process.env.DOMAIN_PATH,
    "public",
    "images",
    req.file.filename
  );
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
  Service.findByPk(req.params.id).then((service) => {
    const imageURL = service.imageUrl;
    Service.destroy({ where: { id: req.params.id } })
      .then(() => {
        deleteFile(imageURL);
        return res.redirect("/services");
      })
      .catch(() => res.send("Some error occured"));
  });
};
