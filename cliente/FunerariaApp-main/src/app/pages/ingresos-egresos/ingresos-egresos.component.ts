import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IngresosServices } from 'src/app/Servicios/Ingresos.service';

interface Income {
  IngresoID: number;
  Fecha: string;
  ConceptoID: number;
  NombreConcepto: string;
  Descripcion: string;
  Proveedor: string;
  Piezas: number;
  CajaChica: boolean;
  Monto: number;
  Saldo: number;
  Comprobante: string;
  SegmentoID: number;
  NombreSegmento: string;
  CategoriaID: number;
  NombreCategoria: string;
  SubcategoriaID: number;
  NombreSubcategoria: string;
  EstatusComprobacionID: number;
  NombreEstatus: string;
  FechaAutorizacion: string;
  UsuarioAutorizaID: number;
  NombreUsuarioAutoriza: string;
  UsuarioRecibeID: number;
  NombreUsuarioRecibe: string;
  FechaConciliacion: string;
  ObservacionesDifConciliacion: string;
}

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styleUrls: ['./ingresos-egresos.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule],
})
export class IngresosEgresosComponent implements OnInit {
  incomes: Income[] = [];
  paginatedIncomes: Income[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0; // Inicializar totalPages con 0

  // Search variables
  searchFields = [
    { value: 'IngresoID', label: 'Ingreso ID' },
    { value: 'Fecha', label: 'Fecha' },
    { value: 'NombreConcepto', label: 'Concepto' },
    { value: 'Descripcion', label: 'Descripcion' },
    { value: 'Proveedor', label: 'Proveedor' },
    { value: 'Piezas', label: 'Piezas' },
    { value: 'CajaChica', label: 'Tipo de ingreso' },
    { value: 'Monto', label: 'Monto' },
    { value: 'Saldo', label: 'Saldo' },
    { value: 'Comprobante', label: 'Comprobante' },
    { value: 'NombreSegmento', label: 'Segmento' },
    { value: 'NombreCategoria', label: 'Categoria' },
    { value: 'NombreSubcategoria', label: 'Subcategoria' },
    { value: 'NombreEstatus', label: 'Estatus' },
    { value: 'FechaAutorizacion', label: 'Fecha Autorizacion' },
    { value: 'NombreUsuarioAutoriza', label: 'Usuario Autoriza' },
    { value: 'NombreUsuarioRecibe', label: 'Usuario Recibe' },
    { value: 'FechaConciliacion', label: 'Fecha Conciliacion' },
    { value: 'ObservacionesDifConciliacion', label: 'Observaciones' },
  ];
  selectedField: string = '';
  searchText: string = '';
  dateSearch: { startDate: string, endDate: string } = { startDate: '', endDate: '' };

  constructor(private modalController: ModalController, private _ingresoServ: IngresosServices) { }

  ngOnInit() {
    this.loadIngresos();
  }

  loadIngresos() {
    this._ingresoServ.getIngresos().subscribe((data: Income[]) => {
      this.incomes = data.map(income => ({
        ...income,
        Fecha: new Date(income.Fecha).toISOString().split('T')[0], // Formatear la fecha
        FechaAutorizacion: new Date(income.FechaAutorizacion).toISOString().split('T')[0], // Formatear la fecha
        FechaConciliacion: new Date(income.FechaConciliacion).toISOString().split('T')[0] // Formatear la fecha
      }));
      this.totalPages = Math.ceil(this.incomes.length / this.itemsPerPage);
      this.updatePaginatedIncomes();
      console.log("esta es la data de ingresos: ", this.incomes);
    }, (error) => {
      console.error('Error fetching incomes', error); 
    });
  }

  updatePaginatedIncomes() {
    this.totalPages = Math.ceil(this.incomes.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedIncomes = this.incomes.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedIncomes();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedIncomes();
    }
  }

  isDateField(field: string): boolean {
    return ['Fecha', 'FechaAutorizacion', 'FechaConciliacion'].includes(field);
  }

  applySearch() {
    let filteredIncomes = [...this.incomes];

    if (this.selectedField) {
      if (this.isDateField(this.selectedField)) {
        const { startDate, endDate } = this.dateSearch;
        filteredIncomes = filteredIncomes.filter(income =>
          new Date(income[this.selectedField as keyof Income] as string) >= new Date(startDate) &&
          new Date(income[this.selectedField as keyof Income] as string) <= new Date(endDate)
        );
      } else {
        filteredIncomes = filteredIncomes.filter(income =>
          (income[this.selectedField as keyof Income] as string).toString().toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    }

    this.paginatedIncomes = filteredIncomes.slice(0, this.itemsPerPage);
    this.totalPages = Math.ceil(filteredIncomes.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  resetSearch() {
    this.selectedField = '';
    this.searchText = '';
    this.dateSearch = { startDate: '', endDate: '' };
    this.updatePaginatedIncomes();
  }
}
