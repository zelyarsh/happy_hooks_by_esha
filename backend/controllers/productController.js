const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

// GET PRODUCTS BY CATEGORY
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const products = await Product.find({
      categoryId,
    })
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      category: {
        id: category._id,
        name: category.name,
        slug: category.slug,
      },
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch category products",
      error: error.message,
    });
  }
};

// GET PRODUCTS BY SUBCATEGORY
const getProductsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    const subCategory =
      await SubCategory.findById(subCategoryId);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const products = await Product.find({
      subCategoryId,
    })
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: products.length,
      subCategory: {
        id: subCategory._id,
        name: subCategory.name,
        slug: subCategory.slug,
      },
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategory products",
      error: error.message,
    });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      categoryId,
      subCategoryId,
      name,
      slug,
      description,
      price,
      compareAtPrice,
      stock,
      sku,
      images,
      featured,
      newArrival,
      status,
      displayOrder,
    } = req.body;

    // CATEGORY IS REQUIRED
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // CHECK CATEGORY
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Selected category does not exist",
      });
    }

    // SUBCATEGORY IS OPTIONAL
    if (subCategoryId) {
      const subCategory =
        await SubCategory.findById(subCategoryId);

      if (!subCategory) {
        return res.status(404).json({
          success: false,
          message: "Selected subcategory does not exist",
        });
      }

      // IMPORTANT:
      // Make sure subcategory belongs to selected category
      if (
        subCategory.categoryId.toString() !==
        categoryId.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Selected subcategory does not belong to the selected category",
        });
      }
    }

    // PRODUCT NAME REQUIRED
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    // PRICE REQUIRED
    if (price === undefined || price === null) {
      return res.status(400).json({
        success: false,
        message: "Product price is required",
      });
    }

    // GENERATE SLUG
    const productSlug =
      slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    // CHECK DUPLICATE SLUG
    const existingSlug = await Product.findOne({
      slug: productSlug,
    });

    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "A product with this slug already exists",
      });
    }

    // CHECK SKU
    if (sku) {
      const existingSku = await Product.findOne({
        sku: sku.trim(),
      });

      if (existingSku) {
        return res.status(400).json({
          success: false,
          message: "A product with this SKU already exists",
        });
      }
    }

    const product = await Product.create({
      categoryId,
      subCategoryId: subCategoryId || null,
      name: name.trim(),
      slug: productSlug,
      description: description || "",
      price: Number(price),
      compareAtPrice: Number(compareAtPrice) || 0,
      stock: Number(stock) || 0,
      sku: sku ? sku.trim() : undefined,
      images: Array.isArray(images) ? images : [],
      featured: featured || false,
      newArrival: newArrival || false,
      status: status || "Active",
      displayOrder: Number(displayOrder) || 1,
    });

    const populatedProduct =
      await Product.findById(product._id)
        .populate("categoryId", "name slug")
        .populate("subCategoryId", "name slug");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      categoryId,
      subCategoryId,
      name,
      slug,
      description,
      price,
      compareAtPrice,
      stock,
      sku,
      images,
      featured,
      newArrival,
      status,
      displayOrder,
    } = req.body;

    // CATEGORY VALIDATION
    if (categoryId !== undefined) {
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Selected category does not exist",
        });
      }

      product.categoryId = categoryId;
    }

    // SUBCATEGORY VALIDATION
    if (subCategoryId !== undefined) {
      if (subCategoryId === null || subCategoryId === "") {
        product.subCategoryId = null;
      } else {
        const subCategory =
          await SubCategory.findById(subCategoryId);

        if (!subCategory) {
          return res.status(404).json({
            success: false,
            message: "Selected subcategory does not exist",
          });
        }

        const finalCategoryId =
          categoryId !== undefined
            ? categoryId
            : product.categoryId;

        if (
          subCategory.categoryId.toString() !==
          finalCategoryId.toString()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Selected subcategory does not belong to the selected category",
          });
        }

        product.subCategoryId = subCategoryId;
      }
    }

    if (name !== undefined) {
      product.name = name.trim();
    }

    if (slug !== undefined) {
      product.slug = slug.toLowerCase().trim();
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = Number(price);
    }

    if (compareAtPrice !== undefined) {
      product.compareAtPrice =
        Number(compareAtPrice) || 0;
    }

    if (stock !== undefined) {
      product.stock = Number(stock) || 0;
    }

    if (sku !== undefined) {
      product.sku = sku ? sku.trim() : undefined;
    }

    if (images !== undefined) {
      product.images = Array.isArray(images)
        ? images
        : [];
    }

    if (featured !== undefined) {
      product.featured = featured;
    }

    if (newArrival !== undefined) {
      product.newArrival = newArrival;
    }

    if (status !== undefined) {
      product.status = status;
    }

    if (displayOrder !== undefined) {
      product.displayOrder =
        Number(displayOrder) || 1;
    }

    const updatedProduct = await product.save();

    const populatedProduct =
      await Product.findById(updatedProduct._id)
        .populate("categoryId", "name slug")
        .populate("subCategoryId", "name slug");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: populatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};