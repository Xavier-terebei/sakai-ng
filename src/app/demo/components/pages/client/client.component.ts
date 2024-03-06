import {Component, ElementRef, ViewChild} from '@angular/core';
import {Utilisateur} from "../../../domaines/utilisateur";
import {ProductService} from "../../../service/product.service";
import {UtilisateurMetier} from "../../../metiers/utilisateur.metier";
import {FormBuilder} from "@angular/forms";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {httpJsonResponse} from "../../../../layout/models/models";
import {Client} from "../../../domaines/client";
import {TypeAction} from "../../../../layout/methode/methode";
import {ModalClientComponent} from "../employe/modal/modal-client/modal-client.component";
import {Table} from "primeng/table";
import {ClientMetier} from "../../../metiers/client.metier";
import {ModalClientsComponent} from "./modal/modal-clients/modal-clients.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
    loading: boolean = false;
    clientList: Client[]=[]
    client!: Client
    _currentActionType: string = '';
    _title: string = '';
    _update= 'Modifier le client';
    _action :string = '';
    @ViewChild('filter') filter!: ElementRef;



    _add: string = 'Créer un client';

    constructor(
        private productService: ProductService,
        private metierClient: ClientMetier,
        private _fb: FormBuilder,
        private dialogService: DialogService,
        private dialogRef: DynamicDialogRef,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}



    ngOnInit() {
        this.getAllClient();
    }

    getAllClient = async ():Promise<any> => {
        const res: httpJsonResponse = await this.metierClient.getClient();
        this.clientList = res.data
    }

    handleUpdate(client: Client) {
        this._currentActionType = TypeAction.update;
        this._title = this._update;
        this.client = client;
        this.openmodal();
    }

    openmodal(): void {
        this.dialogRef = this.dialogService.open(ModalClientsComponent, {
            data: {
                actiontype: this._currentActionType,
                client: this.client,
            },
            header: this._title,
            width: '40%',
            contentStyle: { overflow: 'auto' },
        });
        this.dialogRef.onClose.subscribe((res) => {
            if (res) {
                this.getAllClient().then(r => {});
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

    delete = async (clientid:string) => {
        const res: httpJsonResponse = await this.metierClient.deleteClient(clientid);
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
