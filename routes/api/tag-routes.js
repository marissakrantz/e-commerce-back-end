const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [
      { model: Product, as: "product_id" },
    ],
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, as: "product_id" },
      ],
    });
    if (!tag) {
      res.status(404).json({ message: 'No item found with that id!' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  const tag = await Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//update tag name by ID value
router.put('/:id', async (req, res) => {
  const tag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      }
    })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  const tag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.json({
      data: "success"
    })
  }).catch((err) => {
    res.status(500).json({
      error: err
    })
  });
});

module.exports = router;
