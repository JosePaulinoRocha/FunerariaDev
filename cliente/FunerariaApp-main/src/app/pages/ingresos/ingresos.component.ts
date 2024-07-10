import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncomeModalComponent } from './modal/income-modal.component';

interface Income {
  date: string;
  segment: string;
  category: string;
  subcategory: string;
  concept: string;
  description: string;
  provider: string;
  pieces: number;
  type: string;
  amount: number;
  balance: number;
  status: string;
  approvalDate: string;
  authorizedUser: string;
  receivedUser: string;
  reconciliationDates: string[];
  observations: string;
}

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, IncomeModalComponent],
})
export class IngresosComponent implements OnInit {
  searchTerm: string = '';
  incomes: Income[] = [
    {
      date: '2024-01-01',
      segment: 'Segmento 1',
      category: 'Categoría 1',
      subcategory: 'Subcategoría 1',
      concept: 'Concepto 1',
      description: 'Descripción 1',
      provider: 'Proveedor 1',
      pieces: 10,
      type: 'Caja Chica',
      amount: 100.00,
      balance: 100.00,
      status: 'Validado',
      approvalDate: '2024-01-02',
      authorizedUser: 'Usuario 1',
      receivedUser: 'Usuario 2',
      reconciliationDates: ['2024-01-03'],
      observations: 'Observaciones 1'
    },
    // Agrega más registros de ejemplo aquí
    {
      date: '2024-02-01',
      segment: 'Segmento 2',
      category: 'Categoría 2',
      subcategory: 'Subcategoría 2',
      concept: 'Concepto 2',
      description: 'Descripción 2',
      provider: 'Proveedor 2',
      pieces: 20,
      type: 'Cuenta bancaria',
      amount: 200.00,
      balance: 200.00,
      status: 'Manual',
      approvalDate: '2024-02-02',
      authorizedUser: 'Usuario 3',
      receivedUser: 'Usuario 4',
      reconciliationDates: ['2024-02-03'],
      observations: 'Observaciones 2'
    },
    {
      date: '2024-03-01',
      segment: 'Segmento 3',
      category: 'Categoría 3',
      subcategory: 'Subcategoría 3',
      concept: 'Concepto 3',
      description: 'Descripción 3',
      provider: 'Proveedor 3',
      pieces: 30,
      type: 'Efectivo',
      amount: 300.00,
      balance: 300.00,
      status: 'Validado',
      approvalDate: '2024-03-02',
      authorizedUser: 'Usuario 5',
      receivedUser: 'Usuario 6',
      reconciliationDates: ['2024-03-03'],
      observations: 'Observaciones 3'
    },
    {
      date: '2024-04-01',
      segment: 'Segmento 4',
      category: 'Categoría 4',
      subcategory: 'Subcategoría 4',
      concept: 'Concepto 4',
      description: 'Descripción 4',
      provider: 'Proveedor 4',
      pieces: 40,
      type: 'Cheque',
      amount: 400.00,
      balance: 400.00,
      status: 'Manual',
      approvalDate: '2024-04-02',
      authorizedUser: 'Usuario 7',
      receivedUser: 'Usuario 8',
      reconciliationDates: ['2024-04-03'],
      observations: 'Observaciones 4'
    },
    {
      date: '2024-05-01',
      segment: 'Segmento 5',
      category: 'Categoría 5',
      subcategory: 'Subcategoría 5',
      concept: 'Concepto 5',
      description: 'Descripción 5',
      provider: 'Proveedor 5',
      pieces: 50,
      type: 'Transferencia',
      amount: 500.00,
      balance: 500.00,
      status: 'Validado',
      approvalDate: '2024-05-02',
      authorizedUser: 'Usuario 9',
      receivedUser: 'Usuario 10',
      reconciliationDates: ['2024-05-03'],
      observations: 'Observaciones 5'
    },
    {
      date: '2024-06-01',
      segment: 'Segmento 6',
      category: 'Categoría 6',
      subcategory: 'Subcategoría 6',
      concept: 'Concepto 6',
      description: 'Descripción 6',
      provider: 'Proveedor 6',
      pieces: 60,
      type: 'Tarjeta de Crédito',
      amount: 600.00,
      balance: 600.00,
      status: 'Manual',
      approvalDate: '2024-06-02',
      authorizedUser: 'Usuario 11',
      receivedUser: 'Usuario 12',
      reconciliationDates: ['2024-06-03'],
      observations: 'Observaciones 6'
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  filteredIncomes(): Income[] {
    return this.incomes.filter(income => {
      const searchTermLower = this.searchTerm.toLowerCase();
      return (
        income.date.includes(this.searchTerm) ||
        income.concept.toLowerCase().includes(searchTermLower) ||
        income.provider.toLowerCase().includes(searchTermLower) ||
        income.type.toLowerCase().includes(searchTermLower) ||
        income.status.toLowerCase().includes(searchTermLower)
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
        // Lógica para manejar los datos del modal
      }
    });

    return await modal.present();
  }

  getDefaultIncome(): Income {
    return {
      date: '',
      segment: '',
      category: '',
      subcategory: '',
      concept: '',
      description: '',
      provider: '',
      pieces: 0,
      type: '',
      amount: 0,
      balance: 0,
      status: '',
      approvalDate: '',
      authorizedUser: '',
      receivedUser: '',
      reconciliationDates: [],
      observations: ''
    };
  }
}
