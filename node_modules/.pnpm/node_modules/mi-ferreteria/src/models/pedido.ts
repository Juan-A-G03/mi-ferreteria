export type Pedido = {
    id: string;
    usuarioNombre: string;
    usuarioEmail: string;
    fecha: string;
    totalNeto: number;
    totalIva: number;
    totalBruto: number;
  };
  
  export type LineaPedido = {
    id?: number;
    pedidoId: string;
    productoId: number;
    cantidad: number;
    subTotal: number;
  };
  