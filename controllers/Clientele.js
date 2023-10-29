const Clientele = require("./../models/Clientele");
const deleteFile = require("./../utils/deleteFile");

const path = require("path");

exports.getAllClientele = async (req, res, next) => {
  let clientele = await Clientele.findAll();
  clientele = clientele.map((d) => {
    return {
      id: d.id,
      imageUrl: d.imageUrl.split("public")[1],
    };
  });
  res.render("clientele/displayclientele", {
    clientele,
  });
};
exports.getAddClientele = async (req, res, next) => {
  res.render("clientele/addclientele");
};
exports.postAddClientele = (req, res, next) => {
  Clientele.create({
    imageUrl: path.join(
      process.env.DOMAIN_PATH,
      "public",
      "images",
      req.file.filename
    ),
  })
    .then(() => {
      return res.render("clientele/addclientele");
    })
    .catch((error) => {
      console.log(error);
      res.send("Some error occured");
    });
};
exports.getDeleteClientele = async (req, res, next) => {
  const id = req.params.id;
  Clientele.findByPk(id)
    .then((clientele) => {
      Clientele.destroy({
        where: {
          id,
        },
      })
        .then(() => {
          deleteFile(clientele.imageUrl);
          res.redirect("/clientele");
        })
        .catch(() => res.send("Some Error Occured"));
    })
    .catch(() => res.send("Some Error Occured"));
};
