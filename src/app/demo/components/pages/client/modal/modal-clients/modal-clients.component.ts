import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../../../../../domaines/utilisateur";
import {ProductService} from "../../../../../service/product.service";
import {UtilisateurMetier} from "../../../../../metiers/utilisateur.metier";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {TypeAction} from "../../../../../../layout/methode/methode";
import {httpJsonResponse} from "../../../../../../layout/models/models";
import {Client} from "../../../../../domaines/client";
import {ClientMetier} from "../../../../../metiers/client.metier";

@Component({
  selector: 'app-modal-clients',
  templateUrl: './modal-clients.component.html',
  styleUrl: './modal-clients.component.scss'
})
export class ModalClientsComponent {
    _clientForm!: FormGroup;
    loading: boolean = false;
    clientList: Client[]=[];
    client!: Client;
    action: string;

    constructor(
        private productService: ProductService,
        private metierClient: ClientMetier,
        private _fb: FormBuilder,
        private dialogConfig: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private messageService: MessageService
    ) {
        // Initialisation du formulaire
        this._clientForm = this._fb.group({
            idclient: ['', []],
            nomclient: ['', [Validators.required]],
            prenomclient: ['', [Validators.required]],
            dateclient: ['', [Validators.required]],
            adresseclient: ['', [Validators.required]],
            contactclient: ['', [Validators.required]],
        });
        this.action = this.dialogConfig.data.actiontype
        this.client = this.dialogConfig.data.client
    }

    ngOnInit () {
        if (this.dialogConfig.data.actiontype == TypeAction.update){
            this.update(this.client)
        }
    }

    getAllClient = async ():Promise<any> => {
        const res: httpJsonResponse = await this.metierClient.getClient();
        this.clientList = res.data
    }

    update (client: Client){
        this._clientForm.controls['idclient'].setValue(client.idclient)
        this._clientForm.controls['nomclient'].setValue(client.nomclient)
        this._clientForm.controls['prenomclient'].setValue(client.prenomclient)
        this._clientForm.controls['dateclient'].setValue(client.dateclient)
        this._clientForm.controls['adresseclient'].setValue(client.adresseclient)
        this._clientForm.controls['contactclient'].setValue(client.contactclient)
    }

    saveInfo = async (e:any): Promise<any>=> {
        e.preventDefault()
        if (!this._clientForm.valid){
            this.messageService.add({
                severity: 'info',
                summary: 'Warn Message',
                detail: 'Veuillez renseigner tous les champs obligatoires',
                life: 3000 });
        }
        let data ={
            ...this._clientForm.value,
            actiontype: this.action
        }
        const res: httpJsonResponse = await this.metierClient.addOrUpdateClient(data);
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
        this.close(true)
    }
    close(statut: boolean){
        this.ref.close(statut)
    }
}
