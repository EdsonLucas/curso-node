import express from 'express';

const server = express();
server.use(express.json());

const project = [];

server.post('/projects', (req, res) => {
  const { id, title, task = [] } = req.body;

  if(project[id].includes(id)) {
    return res.status(400).json({ message: 'Project id exists' });
  }

  project.push({id, title, task});

  return res.json(project);
});

server.get('/projects', (req, res) => {
  if(project.length == 0) {
    return res.status(400).json({ message: 'No registered projects' });
  }

  return res.json(project);
});

server.get('/projects/:id', (req, res) => {
  if(project.length == 0) {
    return res.status(400).json({ message: 'No registered projects' });
  }

  const { id } = req.params;

  return res.json(project[id]);
});

server.put('/projects/:id', (req, res) => {
  if(project.length == 0) {
    return res.status(400).json({ message: 'No registered projects' });
  }  

  const { id } = req.params;
  const { title } = req.body;

  project[id].title = title;

  return res.json(project);
});

server.delete('/projects/:id', (req, res) => {
  if(project.length == 0) {
    return res.status(400).json({ message: 'No registered projects' });
  }  

  const { id } = req.params;

  project.splice(id, 0);
});

server.post('/projects/:id/tasks', (req, res) => {
  if(project.length == 0) {
    return res.status(400).json({ message: 'No registered projects' });
  }  

  const { id } = req.params;
  const { title } = req.body;

  project[id].task.push(title);
});

server.listen(3333);