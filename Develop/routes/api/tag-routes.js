const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  const productTag = await ProductTag.findAll({
    include: {
      model: Product,
    },
  }).catch((err) => {
    res.json(err);
  });
  res.json(productTag);
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/id", async (req, res) => {
  const productTag = await productTag
    .findByPk(req.params.id, {
      include: {
        model: Product,
      },
    })
    .catch((err) => {
      res.json(err);
    });
  res.json(productTag);
});

// create a new tag
router.post("/", (req, res) => {
  ProductTag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  ProductTag.update(
    {
      tag_id: req.body.tag_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "Invalid ID." });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  ProductTag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "No Tag found by that ID." });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
