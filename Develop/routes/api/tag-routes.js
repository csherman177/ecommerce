const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get("/", async (req, res) => {
  try {
    const productTag = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.json(productTag);
  } catch (error) {
    res.json(error);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get("/:id", async (req, res) => {
  try {
    const productTag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.json(productTag);
  } catch (error) {
    res.json(error);
  }
});

// create a new tag
router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "No Tag with ID Found" });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
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
