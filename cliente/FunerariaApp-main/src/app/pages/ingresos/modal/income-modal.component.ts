import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule, AlertController  } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IngresosServices } from 'src/app/Servicios/Ingresos.service';

interface Ingreso {
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
  UsuarioRecibeID: number;
  FechaConciliacion: string;
  ObservacionesDifConciliacion: string;
}

interface Concepto {
  ConceptoID: number;
  Nombre: string;
}

interface Segmento {
  SegmentoID: number;
  Nombre: string;
}

interface Categoria {
  CategoriaID: number;
  Nombre: string;
}

interface Subcategoria {
  SubcategoriaID: number;
  Nombre: string;
}

interface Usuario {
  userId: number;
  fullName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

interface Combinacion {
  CombinacionID: number;
  ConceptoID: number;
  SegmentoID: number;
  CategoriaID: number;
  SubcategoriaID: number;
}

interface Estatus {
  EstatusID: number;
  Descripcion: string;
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
    ConceptoID: 0,
    NombreConcepto: '',
    Descripcion: '',
    Proveedor: '',
    Piezas: 0,
    CajaChica: false,
    Monto: 0,
    Saldo: 0,
    Comprobante: '',
    SegmentoID: 0,
    NombreSegmento: '',
    CategoriaID: 0,
    NombreCategoria: '',
    SubcategoriaID: 0,
    NombreSubcategoria: '',
    EstatusComprobacionID: 0,
    NombreEstatus: '',
    FechaAutorizacion: '',
    UsuarioAutorizaID: 0,
    UsuarioRecibeID: 0,
    FechaConciliacion: '',
    ObservacionesDifConciliacion: '',
  };

  concepto: Concepto[] = [];
  segmento: Segmento[] = [];
  categoria: Categoria[] = [];
  subcategoria: Subcategoria[] = [];
  usuario: Usuario[] = [];
  combinacion: Combinacion[] = [];
  estatus: Estatus[] = [];
  
  @Input() isEditMode: boolean = false;

  constructor(private modalController: ModalController, private _ingresoServ: IngresosServices, private alertController: AlertController) {}

  updateCombinations() {
    // Filtrar combinaciones que incluyan el ConceptoID seleccionado
    const filteredCombinations = this.combinacion.filter(c => c.ConceptoID === this.ingreso.ConceptoID);
    
    if (filteredCombinations.length > 0) {
      // Encontrar la combinación con el mayor CombinacionID
      const latestCombination = filteredCombinations.reduce((prev, current) => {
        return (prev.CombinacionID > current.CombinacionID) ? prev : current;
      });
  
      // Actualizar los campos correspondientes
      this.ingreso.SegmentoID = latestCombination.SegmentoID;
      this.ingreso.CategoriaID = latestCombination.CategoriaID;
      this.ingreso.SubcategoriaID = latestCombination.SubcategoriaID;
    }
  }
  

  ngOnInit() {
    this.loadConceptos();
    this.loadSegmentos();
    this.loadCategorias();
    this.loadSubcategorias();
    this.loadUsuarios();
    this.loadCombinaciones();
    this.loadEstatus();
  }

  loadConceptos() {
    this._ingresoServ.getConceptos().subscribe((data: Concepto[]) => {
      this.concepto = data;
    }, (error) => {
      this.presentAlert('Error fetching concepts');
    });
  }

  loadSegmentos() {
    this._ingresoServ.getSegmentos().subscribe((data: Segmento[]) => {
      this.segmento = data;
    }, (error) => {
      this.presentAlert('Error fetching segments');
    });
  }

  loadCategorias() {
    this._ingresoServ.getCategorias().subscribe((data: Categoria[]) => {
      this.categoria = data;
    }, (error) => {
      this.presentAlert('Error fetching categories');
    });
  }

  loadSubcategorias() {
    this._ingresoServ.getSubcategorias().subscribe((data: Subcategoria[]) => {
      this.subcategoria = data;
    }, (error) => {
      this.presentAlert('Error fetching subcategories');
    });
  }

  loadUsuarios() {
    this._ingresoServ.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuario = data;
    }, (error) => {
      this.presentAlert('Error fetching users');
    });
  }

  loadCombinaciones() {
    this._ingresoServ.getCombinaciones().subscribe((data: Combinacion[]) => {
      console.log("esta es mi data en combinaciones: ", data)
      this.combinacion = data;
    }, (error) => {
      this.presentAlert('Error fetching combinations');
    });
  }

  loadEstatus() {
    this._ingresoServ.getEstatus().subscribe((data: Estatus[]) => {
      this.estatus = data;
    }, (error) => {
      this.presentAlert('Error fetching statuses');
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  saveIncome() {
    if (this.isEditMode) {
      this._ingresoServ.UpdateIngresos(this.ingreso).subscribe(
        (response) => {
          console.log("esta es la data: ", this.ingreso)
          console.log("esta es la respuesta: ", response)
          this.modalController.dismiss(this.ingreso, 'edit');
        },
        (error) => {
          this.presentAlert('Failed to update income.');
          console.log("este es el error: ", error)
        }
      );
    } else {
      this._ingresoServ.addIngreso(this.ingreso).subscribe(
        (response) => {
          console.log("esta es la data: ", this.ingreso)
          console.log("esta es la respuesta: ", response)
          this.modalController.dismiss(this.ingreso, 'add');
        },
        (error) => {
          this.presentAlert('Failed to add income.');
          console.log("este es el error: ", error)
        }
      );
    }
  }

  closeModal() {
    this.modalController.dismiss(null, 'close');
  }
}
