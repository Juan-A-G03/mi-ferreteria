export type Categoria = {
    id: number;
    nombre: string;
  };
  
  const BASE = (import.meta as ImportMeta & { env: { VITE_API_BASE_URL: string } }).env.VITE_API_BASE_URL;
  
  export async function fetchCategorias(): Promise<Categoria[]> {
    const res = await fetch(`${BASE}/categorias`);
    if (!res.ok) throw new Error('Error cargando categorías');
    return res.json();
  }
  