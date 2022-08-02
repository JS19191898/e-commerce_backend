const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories/` endpoint

router.get('/', async (req, res) => {

  try{

    const categoryData = await Category.findAll({
    include: [Product]
    })

    if(!categoryData){
      res.status(404).json({ message: "No categories were found!"})
    }

    res.json(categoryData)

  } catch(err){
    res.status(500).json(err)
}


  // .then((categories)=> res.json(categories))
  // .catch((err)=> res.status(500).json(err));
});

router.get('/:id',  async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try{

    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
    include: [Product]
    });

    if(!categoryData){
      res.status(404).json({ message: "No categories were found!"})
    }

    res.json(categoryData)

  } catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category

  try{

    const categoryData = await Category.create(req.body)

    res.json(categoryData)

  } catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try{

    const categoryData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
    include: [Product]
    })

    if(!categoryData){
      res.status(404).json({ message: "No categories were found!"})
    }

    res.json(categoryData)

  } catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try{

    const categoryData = await Category.destroy({

    where: {
      id: req.params.id
    },
    });

    if(!categoryData){
      res.status(404).json({ message: "No categories were found!"})
    }

    res.json(categoryData)

  } catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
