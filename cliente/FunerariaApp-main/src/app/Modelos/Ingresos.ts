// ingresos.model.ts

export interface Ingreso {
    ingresoId: number;
    fecha: string;
    conceptoId: number;
    nombreConcepto: string;
    descripcion: string;
    proveedor: string;
    piezas: number;
    cajaChica: boolean;
    monto: number;
    saldo: number;
    comprobante: string;
    segmentoId: number;
    nombreSegmento: string;
    categoriaId: number;
    nombreCategoria: string;
    subcategoriaId: number;
    nombreSubcategoria: string;
    estatusComprobacionId: number;
    nombreEstatus: string;
    fechaAutorizacion: string;
    usuarioAutorizaId: number;
    usuarioRecibeId: number;
    fechaConciliacion: string;
    observacionesDifConciliacion: string;
  }
  