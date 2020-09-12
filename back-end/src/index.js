const express = require('express');
const cors = require('cors');
;const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const projects = []; 

app.get('/projects', (request, response) => {
    const { title } = request.query;

    if (title) {
        const list = projects.filter(project => project.title.includes(title));
        return response.json(list);
    }
    
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const project = { id, title, owner };

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0 ) {
        return response.send({error: 'Project nout find!'})
    }
    projects[projectIndex]= project

    return response.send(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0 ) {
        return response.send({error: 'Project nout find!'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('Back-end started!');
});