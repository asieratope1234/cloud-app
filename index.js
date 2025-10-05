const express = require('express');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Autenticación básica para /tasks
app.use('/tasks', basicAuth({
    users: { 'asier': 'Lliurex-1234' }, // usuario/contraseña
    challenge: true
}));

// Conectar a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGODB_URI, {
  // No necesitas estas opciones con Node 4+ 
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log('Error de conexión:', err));

// Esquema y modelo
const taskSchema = new mongoose.Schema({
  text: String
});
const Task = mongoose.model('Task', taskSchema);

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la app de tareas! Visita /tasks para ver las tareas.');
});

// Obtener tareas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
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

