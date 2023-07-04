const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
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
router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Check if any products reference the category
    const productsExist = await Product.findOne({
      where: {
        category_id: categoryId,
      },
    });

    if (productsExist) {
      // Products referencing the category exist, so delete them first
      await Product.destroy({
        where: {
          category_id: categoryId,
        },
      });
    }

    // Delete the category
    await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    res.status(200).send("Category deleted successfully");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Error deleting category");
  }
});

module.exports = router;
