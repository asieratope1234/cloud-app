const express = require('express');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = []; // lista de tareas

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Añadir tarea
app.post('/tasks', async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

// Eliminar tarea
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tarea eliminada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

