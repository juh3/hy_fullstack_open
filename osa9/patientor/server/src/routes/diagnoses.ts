import express from 'express';
const router = express.Router();
import diagnoseService from '../services/diagnoseService';


router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;