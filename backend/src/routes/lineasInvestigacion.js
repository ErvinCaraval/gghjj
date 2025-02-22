import express from 'express';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config.js';

const router = express.Router();

// Rutas para "Líneas de Investigación"
router.get('/', async (req, res) => {
  try {
    const collectionRef = collection(db, 'Líneas de Investigacion');
    const snapshot = await getDocs(collectionRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (error) {
    console.error('Error al obtener las líneas de investigación:', error);
    res.status(500).json({ error: 'Error al obtener las líneas de investigación' });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const collectionRef = collection(db, 'Líneas de Investigacion');
    const docRef = await addDoc(collectionRef, data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) {
    console.error('Error al crear la línea de investigación:', error);
    res.status(500).json({ error: 'Error al crear la línea de investigación' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Líneas de Investigacion', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      res.json({ id: snapshot.id, ...snapshot.data() });
    } else {
      res.status(404).json({ error: 'Línea de investigación no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la línea de investigación:', error);
    res.status(500).json({ error: 'Error al obtener la línea de investigación' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const docRef = doc(db, 'Líneas de Investigacion', id);
    await updateDoc(docRef, data);
    res.json({ id, ...data });
  } catch (error) {
    console.error('Error al actualizar la línea de investigación:', error);
    res.status(500).json({ error: 'Error al actualizar la línea de investigación' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = doc(db, 'Líneas de Investigacion', id);
    await deleteDoc(docRef);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la línea de investigación:', error);
    res.status(500).json({ error: 'Error al eliminar la línea de investigación' });
  }
});

export default router;
