const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = []; // lista de tareas

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Añadir una tarea
app.post('/tasks', (req, res) => {
  const task = { id: tasks.length + 1, text: req.body.text };
  tasks.push(task);
  res.json(task);
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Tarea eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
