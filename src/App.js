import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const repo = { 
        "url": "https://github.com/Rocketseat/umbriel",
        "title": "Mobile React",
        "techs": ["Node", "Express", "TypeScript"]
    }
    const response = await api.post('repositories', repo)

    setRepositories([...repositories, response.data])
    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    
    const filteredRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(filteredRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          )
        })}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
