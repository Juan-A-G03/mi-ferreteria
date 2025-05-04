export type Producto = {
    id: number;
    nombre: string;
    precio_unitario: number;
    categoria_id: number;
  };
  console.log('API BASE URL:', (import.meta as ImportMeta & { env: { VITE_API_BASE_URL: string } }).env.VITE_API_BASE_URL);
  const BASE = (import.meta as ImportMeta & { env: { VITE_API_BASE_URL: string } }).env.VITE_API_BASE_URL;
  
  export async function fetchProductos(categoriaId?: number): Promise<Producto[]> {
    const url = new URL(`${BASE}/productos`);
    if (categoriaId != null) url.searchParams.set('cat', String(categoriaId));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Error cargando productos');
    return res.json();
  }
  
  export async function crearProducto(p: Omit<Producto,'id'>): Promise<Producto> {
    const res = await fetch(`${BASE}/productos`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(p)
    });
    if (!res.ok) throw new Error('Error creando producto');
    return res.json();
  }
  