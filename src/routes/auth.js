// src/routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require("../models/user");


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Créer un nouveau compte
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mamy Soumaoro
 *               email:
 *                 type: string
 *                 example: mamysoumaoro@gmail.com
 *               password:
 *                 type: string
 *                 example: emira+224
 *     responses:
 *       201:
 *         description: Compte créé avec succès
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email déjà utilisé
 */


router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 }),
  async (req, res, next) => {
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { email, password, name } = req.body;

      const existing = await User.findOne({ where: {email} });

      if (existing)
        return res.status(409).json({ success: false, error: 'Email déjà utilisé' });

       await User.create({ name, email, password});
     
      
      res.status(201).json({ success: true, message: 'Compte créé avec succès' });

    } catch (err) { next(err); }
  }
);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Se connecter et obtenir un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: mamysoumaoro@gmail.com
 *               password:
 *                 type: string
 *                 example: emira+224
 *     responses:
 *       200:
 *          description: Token JWT retourné
 *       401:
 *         description: Identifiants incorrects
 */
router.post("/login",
    body("email").isEmail(),
    body("password").notEmpty(),
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { email, password} = req.body;

            const foundUser = await User.findOne( {where: {email} });

            if (!foundUser || !(await bcrypt.compare(password, foundUser.password )))
                return res.status(401).json({success: false, error: "Identifiants incorrects"});


            const token = jwt.sign(
                { 
                    id: foundUser.id, 
                    email: foundUser.email,
                    name: foundUser.name
                },
            process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRATION || "24h"
                }
            );


            res.status(200).json({
                success: true,
                token,
                user: {
                    id: foundUser.id,
                    name: foundUser.name, 
                    email: foundUser.email
                }
            });
        }
        catch (err) {next(err);}
    }
);
module.exports = router;