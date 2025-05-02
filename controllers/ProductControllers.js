const Product = require('../models/Product');





exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      imageUrl,
      categoryId
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created', product: newProduct });


    
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};



exports.getproductwithcategory = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId'); // fetch all with category

    if (!products || products.length === 0) {
      return res.status(200).json({ message: "No products found" });
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error: " + error.message);
  }
};


exports.deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting product with ID:", id);

    const prod = await Product.findByIdAndDelete(id);

    if (!prod) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};



exports.productbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const prodeta = await Product.findById(id); // ✅ Await the DB call

    if (!prodeta) {
      return res.status(404).json({ message: 'Product not found' }); // ✅ return here
    }

    res.status(200).json(prodeta); // ✅ return actual product
  } catch (error) {
    console.log('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.updateProduct = async (req,res) =>{

  try
  {

    const { id , name, description, price, stock, categoryId } = req.body;
    let imageUrl = '';

    // Only assign imageUrl if file is uploaded
    if (req.file && req.file.filename) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    


    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        stock,
        categoryId,
        ...(imageUrl && { imageUrl }) // only include imageUrl if it's not empty
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  }
  catch(error)
  {
    console.log("Error updating product:", error.message);
    res.status(500).json({ message: "Server error" });
  }

}









