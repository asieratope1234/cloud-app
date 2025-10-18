const express = require('express');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Autenticación básica
app.use('/tasks', basicAuth({
    users: { 'Asier': 'Lliurex-1234' },
    challenge: true
}));

// Conexión a MongoDB
mongoose.connect('mongodb+srv://Asier:Lliurex-1234@clusterasier.erye9hk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAsier')
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log('Error de conexión:', err));

// Esquema y modelo
const taskSchema = new mongoose.Schema({ text: String });
const Task = mongoose.model('Task', taskSchema);

// Rutas
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>¡Bienvenido a la app de tareas!</h1>
        <p>Visita <a href="/tasks">/tasks</a> para ver las tareas.</p>
      </body>
    </html>
  `);
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron cargar las tareas' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const task = new Task({ text: req.body.text });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'No se pudo crear la tarea' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo eliminar la tarea' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
