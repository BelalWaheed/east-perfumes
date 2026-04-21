import { Router } from 'express';
import { Product } from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// ─── GET /products ─────────────────────────────────────────
// Returns all products (same shape as MockAPI array)
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  })
);

// ─── GET /products/:id ─────────────────────────────────────
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  })
);

// ─── POST /products ────────────────────────────────────────
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

// ─── PUT /products/:id ─────────────────────────────────────
// Full replacement — mirrors MockAPI PUT behaviour.
// We use { new: true, runValidators: true } so Mongoose runs schema checks.
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  })
);

// ─── PATCH /products/:id ───────────────────────────────────
// Partial update — convenient for updating just nfcCode or audioURL.
router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  })
);

// ─── DELETE /products/:id ──────────────────────────────────
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', id: req.params.id });
  })
);

export default router;
