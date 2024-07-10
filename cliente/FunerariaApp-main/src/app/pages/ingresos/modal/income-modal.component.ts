import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Income {
  date: string;
  segment: string;
  category: string;
  subcategory: string;
  concept: string;
  description: string;
  provider: string;
  pieces: number;
  incomeType: string;
  amount: number;
  balance: number;
  receipt: string;
  status: string;
  authDate: string;
  authUser: string;
  receivedBy: string;
  reconciliationDate: string;
  notes: string;
}

@Component({
  selector: 'app-income-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class IncomeModalComponent implements OnInit {
  @Input() income: Income = {
    date: '',
    segment: '',
    category: '',
    subcategory: '',
    concept: '',
    description: '',
    provider: '',
    pieces: 0,
    incomeType: '',
    amount: 0,
    balance: 0,
    receipt: '',
    status: '',
    authDate: '',
    authUser: '',
    receivedBy: '',
    reconciliationDate: '',
    notes: ''
  };
  @Input() isEditMode: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveIncome() {
    this.modalController.dismiss(this.income, this.isEditMode ? 'edit' : 'add');
  }
}
