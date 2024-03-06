import {Component, ElementRef, ViewChild} from '@angular/core';
import {Product} from "../../../api/product";
import {ProductService} from "../../../service/product.service";
import {Table} from "primeng/table";
import {httpJsonResponse} from "../../../../layout/models/models";
import {Client} from "../../../domaines/client";
import {TypeAction} from "../../../../layout/methode/methode";
import {ClientMetier} from "../../../metiers/client.metier";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

import {ModalClientComponent} from "./modal/modal-client/modal-client.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {cl} from "@fullcalendar/core/internal-common";
import {Utilisateur} from "../../../domaines/utilisateur";
import {UtilisateurMetier} from "../../../metiers/utilisateur.metier";

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss',
})
export class EmployeComponent {
    loading: boolean = false;
    userList: Utilisateur[]=[]
    user!: Utilisateur
    _currentActionType: string = '';
    _title: string = '';
    _update= 'Modifier le client';
    _action :string = '';
    @ViewChild('filter') filter!: ElementRef;



    _add: string = 'Créer un client';

    constructor(
        private productService: ProductService,
        private metierUser: UtilisateurMetier,
        private _fb: FormBuilder,
        private dialogService: DialogService,
        private dialogRef: DynamicDialogRef,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}



    ngOnInit() {
        this.getAllUtilisateur();
    }

    getAllUtilisateur = async ():Promise<any> => {
        const res: httpJsonResponse = await this.metierUser.getUtilisateur();
        this.userList = res.data
    }

    handleUpdate(user: Utilisateur) {
        this._currentActionType = TypeAction.update;
        this._title = this._update;
        this.user = user;
        this.openmodal();
    }

    openmodal(): void {
        this.dialogRef = this.dialogService.open(ModalClientComponent, {
            data: {
                actiontype: this._currentActionType,
                user: this.user,
            },
            header: this._title,
            width: '40%',
            contentStyle: { overflow: 'auto' },
        });
        this.dialogRef.onClose.subscribe((res) => {
            if (res) {
                this.getAllUtilisateur().then(r => {});
            }
            this._currentActionType = TypeAction.insert
            this._title = this._add;
        });
    }

    confirm(user:Utilisateur) {
        this.confirmationService.confirm({
            header: 'Etre vous sur de vouloir supprimer ce element ?',
            message: 'Veuillez confirmer pour continuer.',
            accept: () => {
                this.delete(user.idutilisateur)
            },
            reject: () => {
            }
        });
    }

    delete = async (userid:string) => {
        const res: httpJsonResponse = await this.metierUser.deleteUtilisateur(userid);
        if (!res.error){
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Opperation effectuer avec success', life: 3000 });
        }else {
            this.messageService.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'Opperation annuler', life: 3000 });
        }

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
