// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCategorias, Categoria } from '../api/categoria';

export function Home() {
  const [cats, setCats] = useState<Categoria[]>([]);
  useEffect(() => {
    fetchCategorias().then(setCats).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Catálogo de categorías</h1>
      <ul>
        {cats.map(c => (
          <li key={c.id}>
            {/* Aquí va el punto 4: cada categoría apunta a /productos/ID */}
            <NavLink to={`/productos/${c.id}`}>{c.nombre}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
