const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get('/repositories', (request, response) => response.json(repositories));

app.post('/repositories', (request, response) => {
  const id = uuid();
  const { title, url, techs } = request.body;
  const likes = 0;
  const repostory = {
    id, title, url, techs, likes,
  };

  repositories.push(repostory);
  return response.json(repostory);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositorieExists = repositories.find((repo) => repo.id === id);
  if (!repositorieExists) response.status(400).json({ msg: 'repositorio não localizado' });
  repositories.map((repo) => {
    if (repo.id === id) {
      if (title) repo.title = title;
      if (url) repo.url = url;
      if (techs) repo.techs = techs;
    }
  });

  const repositorie = repositories.find((repo) => repo.id === id);

  return response.status(200).json(repositorie);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const repositorieExists = repositories.find((repo) => repo.id === id);
  if (!repositorieExists) response.status(400).json({ msg: 'repositorio não localizado' });
  const repo = repositories.filter((repo) => repo.id !== id);
  repositories = repo;
  return response.status(204).json();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;
  const repositorieExists = repositories.find((repo) => repo.id === id);
  if (!repositorieExists) response.status(400).json({ msg: 'repositorio não localizado' });
  repositories.map((repo) => {
    if (repo.id === id) {
      repo.likes += 1;
    }
  });

  const repositorie = repositories.find((repo) => repo.id === id);

  return response.status(200).json(repositorie);
});

module.exports = app;
