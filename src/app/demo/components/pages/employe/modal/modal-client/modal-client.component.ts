import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../../service/product.service";
import {ClientMetier} from "../../../../../metiers/client.metier";
import {httpJsonResponse} from "../../../../../../layout/models/models";
import {Client} from "../../../../../domaines/client";
import {DialogConfig, DialogRef} from "@angular/cdk/dialog";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {TypeAction} from "../../../../../../layout/methode/methode";
import {MessageService} from "primeng/api";
import {Utilisateur} from "../../../../../domaines/utilisateur";
import {UtilisateurMetier} from "../../../../../metiers/utilisateur.metier";

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrl: './modal-client.component.scss'
})
export class ModalClientComponent implements OnInit{
    _form!: FormGroup;
    loading: boolean = false;
    utilisateurList: Utilisateur[]=[];
    utilisateur!: Utilisateur;
    action: string;

    constructor(
        private productService: ProductService,
        private metierUtilisateur: UtilisateurMetier,
        private _fb: FormBuilder,
        private dialogConfig: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private messageService: MessageService
    ) {
        // Initialisation du formulaire
        this._form = this._fb.group({
            idutilisateur: ['', []],
            nomutilisateur: ['', [Validators.required]],
            prenomutilisateur: ['', [Validators.required]],
            emailutilisateur: ['', [Validators.required]],
            contactutilisateur: ['', [Validators.required]],
        });
        this.action = this.dialogConfig.data.actiontype
        this.utilisateur = this.dialogConfig.data.user
    }

    ngOnInit () {
        if (this.dialogConfig.data.actiontype == TypeAction.update){
            this.update(this.utilisateur)
        }
    }

    getAllClient = async ():Promise<any> => {
        const res: httpJsonResponse = await this.metierUtilisateur.getUtilisateur();
        this.utilisateurList = res.data
    }

    update (user: Utilisateur){
        this._form.controls['idutilisateur'].setValue(user.idutilisateur)
        this._form.controls['nomutilisateur'].setValue(user.nomutilisateur)
        this._form.controls['prenomutilisateur'].setValue(user.prenomutilisateur)
        this._form.controls['emailutilisateur'].setValue(user.emailutilisateur)
        this._form.controls['contactutilisateur'].setValue(user.contactutilisateur)
    }

    saveInfo = async (e:any): Promise<any>=> {
        e.preventDefault()
        if (!this._form.valid){
            this.messageService.add({
                severity: 'info',
                summary: 'Warn Message',
                detail: 'Veuillez renseigner tous les champs obligatoires',
                life: 3000 });
        }
        let data ={
            ...this._form.value,
            actiontype: this.action
        }
        const res: httpJsonResponse = await this.metierUtilisateur.addOrUpdateUtilisateur(data);
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
