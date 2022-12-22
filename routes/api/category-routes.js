const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(DataCatagory => {
      if(!DataCatagory) {
        res.status(404).json({message: 'No categories found'});
        return;
      }
      res.json(DataCatagory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "stock", "price", "category_id"],
    },
  })
    .then((DataCatagory) => {
      if (!DataCatagory) {
        res.status(404).json({ message: "no such catagories exist" });
        return;
      }

      res.json(DataCatagory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    catagory_name: req.body.catagory_name,
  });
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((DataCatagory) => {
      if (!DataCatagory) {
        res.status(404).json({ message: "this id doesnt exist!" });
        return;
      }
      res.status(500).json(DataCatagory);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
      return;
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((DataCatagory) => {
      if (!DataCatagory) {
        res.status(404).json({ message: "no such catagory exist" });
        return;
      }
      res.json(DataCatagory);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
