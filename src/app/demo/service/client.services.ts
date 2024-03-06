import { Injectable } from '@angular/core';
import {ApiService} from "../../layout/service/api.services";
import {lastValueFrom} from "rxjs";
import {Client} from "../domaines/client";

@Injectable({
  providedIn: 'root'
})
export class ClientServices {

  constructor(private api: ApiService) {}
  getMyAllClient = async (): Promise<any> => {
    return await lastValueFrom(this.api.get("clients"));
  }

  getMyClientById = async (id: string): Promise<any> => {
    return await lastValueFrom(this.api.get("clients/" + id));
  }

  addClient = async (data: Client): Promise<any> => {
    return await lastValueFrom(this.api.post(`clients`, data));
  }

  updateClient = async (data: any): Promise<any> => {
    return await lastValueFrom(this.api.put(`clients/${data.idClient}`, data));
  }

  deleteClient = async (idclient: string): Promise<any> => {
    console.log(idclient)
    return await lastValueFrom(this.api.delete(`clients/${idclient}`));
  }


}
