import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncomeModalComponent } from './modal/income-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { IngresosServices } from 'src/app/Servicios/Ingresos.service';

interface Income {
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
      return (
        income.nombreConcepto.toLowerCase().includes(searchTermLower)
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
      ingresoId: 0,
      fecha: '',
      conceptoId: 0,
      nombreConcepto: '',
      descripcion: '',
      proveedor: '',
      piezas: 0,
      cajaChica: false,
      monto: 0,
      saldo: 0,
      comprobante: '',
      segmentoId: 0,
      nombreSegmento: '',
      categoriaId: 0,
      nombreCategoria: '',
      subcategoriaId: 0,
      nombreSubcategoria: '',
      estatusComprobacionId: 0,
      nombreEstatus: '',
      fechaAutorizacion: '',
      usuarioAutorizaId: 0,
      usuarioRecibeId: 0,
      fechaConciliacion: '',
      observacionesDifConciliacion: '',
    };
  }
}
