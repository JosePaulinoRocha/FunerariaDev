import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncomeModalComponent } from './modal/income-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { IngresosServices } from 'src/app/Servicios/Ingresos.service';

interface Income {
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

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, IncomeModalComponent, HttpClientModule],
})
export class IngresosComponent implements OnInit {
  searchTerm: string = '';
  incomes: Income[] = [];

  constructor(private modalController: ModalController, private _ingresoServ: IngresosServices) { }

  ngOnInit() {
    this.loadIngresos();
  }

  loadIngresos() {
    this._ingresoServ.getIngresos().subscribe((data: Income[]) => {
      this.incomes = data;
      console.log("esta es la data de ingresos: ", data);
    }, (error) => {
      console.error('Error fetching incomes', error); 
    });
  }

  filteredIncomes(): Income[] {
    return this.incomes.filter(income => {
      const searchTermLower = this.searchTerm.toLowerCase();
      const NombreConcepto = income.NombreConcepto ? income.NombreConcepto.toLowerCase() : '';
      const Proveedor = income.Proveedor ? income.Proveedor.toLowerCase() : '';
      const Descripcion = income.Descripcion ? income.Descripcion.toLowerCase() : '';
      const NombreSegmento = income.NombreSegmento ? income.NombreSegmento.toLowerCase() : '';
      const NombreCategoria = income.NombreCategoria ? income.NombreCategoria.toLowerCase() : '';
      const NombreSubcategoria = income.NombreSubcategoria ? income.NombreSubcategoria.toLowerCase() : '';
      const NombreEstatus = income.NombreEstatus ? income.NombreEstatus.toLowerCase() : '';

      return (
        NombreConcepto.includes(searchTermLower) ||
        Proveedor.includes(searchTermLower) ||
        Descripcion.includes(searchTermLower) ||
        NombreSegmento.includes(searchTermLower) ||
        NombreCategoria.includes(searchTermLower) ||
        NombreSubcategoria.includes(searchTermLower) ||
        NombreEstatus.includes(searchTermLower) ||
        income.Fecha.includes(this.searchTerm) ||
        income.Monto.toString().includes(this.searchTerm) ||
        income.Saldo.toString().includes(this.searchTerm)
      );
    });
  }

  async openModal(income?: Income) {
    const modal = await this.modalController.create({
      component: IncomeModalComponent,
      componentProps: {
        income: income || this.getDefaultIncome()
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.loadIngresos();
      }
    });

    return await modal.present();
  }

  getDefaultIncome(): Income {
    return {
      IngresoId: 0,
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
  }
}
