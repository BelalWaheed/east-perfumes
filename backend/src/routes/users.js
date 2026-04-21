import { Router } from 'express';
import { User } from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// ─── GET /users ────────────────────────────────────────────
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  })
);

// ─── GET /users/:id ────────────────────────────────────────
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  })
);

// ─── POST /users ───────────────────────────────────────────
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
  })
);

// ─── PUT /users/:id ────────────────────────────────────────
// Full replacement — mirrors MockAPI PUT.
// NOTE: password is stored as plain text to match your existing logic.
//       Add bcrypt here if you upgrade to proper auth later.
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  })
);

// ─── PATCH /users/:id ──────────────────────────────────────
// Partial update — used by the frontend for points, purchasedProducts, etc.
router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  })
);

// ─── DELETE /users/:id ─────────────────────────────────────
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', id: req.params.id });
  })
);

export default router;
