import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductos, Producto } from '../api/productos';
import { ProductCard } from '../components/productCard';

export function Products() {
  const { catId } = useParams<{ catId: string }>();
  const [items, setItems] = useState<Producto[]>([]);

  useEffect(() => {
    if (catId) {
      fetchProductos(Number(catId))
        .then(setItems)
        .catch(console.error);
    }
  }, [catId]);

  return (
    <div>
      <h1>Productos de la categoría {catId}</h1>
      {items.length === 0 && <p>No hay productos.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {items.map(p => (
          <ProductCard
            key={p.id}
            id={p.id}
            nombre={p.nombre}
            precio_unitario={p.precio_unitario}
          />
        ))}
      </div>
      <p><Link to="/">← Volver a categorías</Link></p>
    </div>
  );
}
