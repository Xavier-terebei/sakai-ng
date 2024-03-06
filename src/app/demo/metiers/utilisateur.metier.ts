import {Injectable} from '@angular/core';
import {Utilisateur} from "../domaines/utilisateur";
import {ApiService} from "../../layout/service/api.services";
import {TypeAction} from "../../layout/methode/methode";
import {UtilisateurServices} from "../service/utilisateur.services";
import {httpJsonResponse} from "../../layout/models/models";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurMetier{
  constructor(
    private api: ApiService, private UtilisateurService: UtilisateurServices) {}

  getUtilisateur = async ():Promise<httpJsonResponse> => {
    const response = await this.UtilisateurService.getMyAllUtilisateur();
    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }



  getUtilisateurById = async (id : string):Promise<httpJsonResponse> => {
    const response = await this.UtilisateurService.getMyUtilisateurById(id);
    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }


  addOrUpdateUtilisateur = async (data: Utilisateur):Promise<httpJsonResponse> => {
    let response:any;
    if(data.actiontype === TypeAction.insert){
      delete data.actiontype;
      response = await this.UtilisateurService.addUtilisateur(data);
    }
    else{
      delete data.actiontype;
      response = await this.UtilisateurService.updateUtilisateur(data);
    }

    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }


  deleteUtilisateur = async (idUtilisateur: string):Promise<httpJsonResponse> => {
    const response = await this.UtilisateurService.deleteUtilisateur(idUtilisateur);

    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }



}


