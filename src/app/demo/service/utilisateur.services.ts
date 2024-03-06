import { Injectable } from '@angular/core';
import {ApiService} from "../../layout/service/api.services";
import {lastValueFrom} from "rxjs";
import {Utilisateur} from "../domaines/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServices {

  constructor(private api: ApiService) {}
  getMyAllUtilisateur = async (): Promise<any> => {
    return await lastValueFrom(this.api.get("utilisateurs"));
  }

  getMyUtilisateurById = async (id: string): Promise<any> => {
    return await lastValueFrom(this.api.get("utilisateurs/" + id));
  }

  addUtilisateur = async (data: Utilisateur): Promise<any> => {
    return await lastValueFrom(this.api.post(`utilisateurs`, data));
  }

  updateUtilisateur = async (data: any): Promise<any> => {
    return await lastValueFrom(this.api.put(`utilisateurs/${data.idUtilisateur}`, data));
  }

  deleteUtilisateur = async (idUtilisateur: string): Promise<any> => {
    return await lastValueFrom(this.api.delete(`utilisateurs/${idUtilisateur}`));
  }


}
