const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  const category = await Category.findAll({
    include: {
      model: Product,
    },
  }).catch((err) => {
    res.json(err);
  });
  res.json(category);
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/id", async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: {
      model: Product,
    },
  }).catch((err) => {
    res.json(err);
  });
  res.json(category);
});

// create a new category
router.post("/", async (req, res) => {
  const category = await Category.create(req.body).catch((err) => {
    res.json(err);
  });
  res.json(category);
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    if (!category[0]) {
      res.status(404).json({ message: "No category found!" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
