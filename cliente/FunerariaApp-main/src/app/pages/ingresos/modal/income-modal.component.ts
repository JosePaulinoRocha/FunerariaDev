import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IngresosServices } from 'src/app/Servicios/Ingresos.service';

interface Ingreso {
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

interface Concepto {
  ConceptoID: number;
  Nombre: string;
}

@Component({
  selector: 'app-income-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, HttpClientModule],
})
export class IncomeModalComponent implements OnInit {
  @Input() ingreso: Ingreso = {
    Fecha: '',
    ConceptoId: 0,
    NombreConcepto: '',
    Descripcion: '',
    Proveedor: '',
    Piezas: 0,
    CajaChica: false,
    Monto: 0,
    Saldo: 0,
    Comprobante: '',
    SegmentoId: 0,
    NombreSegmento: '',
    CategoriaId: 0,
    NombreCategoria: '',
    SubcategoriaId: 0,
    NombreSubcategoria: '',
    EstatusComprobacionId: 0,
    NombreEstatus: '',
    FechaAutorizacion: '',
    UsuarioAutorizaId: 0,
    UsuarioRecibeId: 0,
    FechaConciliacion: '',
    ObservacionesDifConciliacion: '',
  };

  concepto: Concepto[] = [];
  
  @Input() isEditMode: boolean = false;

  constructor(private modalController: ModalController, private _ingresoServ: IngresosServices) {}

  ngOnInit() {
    this.loadConceptos();
  }

  loadConceptos() {
    this._ingresoServ.getConceptos().subscribe((data: Concepto[]) => {
      this.concepto = data;
      console.log("esta es la data de Conceptos: ", data);
    }, (error) => {
      console.error('Error fetching incomes', error); 
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  saveIncome() {
    this.modalController.dismiss(this.ingreso, this.isEditMode ? 'edit' : 'add');
  }
}
