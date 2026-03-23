const validateSensor = require("../middleware/validateSensor");
const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/sensorsController');
const authenticate = require("../middleware/auth");


/**
 * @swagger
 * /api/sensors:
 *   get:
 *     summary: Retourne tous les capteurs IoT
 *     tags: [Sensors]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Liste des capteurs
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/', authenticate,  controller.getAll);


/**
 * @swagger
 * /api/sensors/{id}:
 *   get:
 *     summary: Retourne un capteur par son ID
 *     tags: [Sensors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Capteur trouvé
 *       404:
 *         description: Capteur non trouvé
 */
router.get('/:id', authenticate,  controller.getById);


/**
 * @swagger
 * /api/sensors:
 *   post:
 *     summary: Créer un nouveau capteur
 *     tags: [Sensors]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Capteur Salon
 *               type:
 *                 type: string
 *                 enum: [temperature, humidity, light, pressure]
 *               value:
 *                 type: number
 *                 example: 23.5
 *               unit:
 *                 type: string
 *                 example: degC
 *     responses:
 *       201:
 *         description: Capteur créé
 *       400:
 *         description: Données invalides
 */
router.post('/', validateSensor, authenticate,  controller.create);


/**
 * @swagger
 * /api/sensors/{id}:
 *   put:
 *     summary: Modifier un capteur
 *     tags: [Sensors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Capteur modifié
 *       404:
 *         description: Capteur non trouvé
 */
router.put('/:id', validateSensor, authenticate,  controller.update);



/**
 * @swagger
 * /api/sensors/{id}:
 *   delete:
 *     summary: Supprimer un capteur
 *     tags: [Sensors]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Capteur supprimé
 *       404:
 *         description: Capteur non trouvé
 */
router.delete('/:id', authenticate, controller.remove);





module.exports = router;