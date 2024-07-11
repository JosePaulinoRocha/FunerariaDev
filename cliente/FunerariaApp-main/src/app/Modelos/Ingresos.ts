export interface Ingreso {
  IngresoId: number;
  Fecha: string;
  ConceptoId: number;
  NombreConcepto: string;
  Descripcion: string;
  Proveedor: string;
  Piezas: number;
  CajaChica: boolean;
  Monto: number;
  Saldo: number;
  Comprobante: string;
  SegmentoId: number;
  NombreSegmento: string;
  CategoriaId: number;
  NombreCategoria: string;
  SubcategoriaId: number;
  NombreSubcategoria: string;
  EstatusComprobacionId: number;
  NombreEstatus: string;
  FechaAutorizacion: string;
  UsuarioAutorizaId: number;
  UsuarioRecibeId: number;
  FechaConciliacion: string;
  ObservacionesDifConciliacion: string;
}

export interface Concepto {
  ConceptoID: number;
  Nombre: string;
}