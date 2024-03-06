import {Injectable} from '@angular/core';
import {ApiService} from '../../layout/service/api.services';
import {Client} from "../domaines/client";
import {ClientServices} from "../service/client.services";
import {TypeAction} from "../../layout/methode/methode";
import {httpJsonResponse} from "../../layout/models/models";
//import {Client} from "../domaines/client";

@Injectable({
  providedIn: 'root'
})
export class ClientMetier{
  constructor(
    private api: ApiService, private clientService: ClientServices) {}

  getClient = async ():Promise<httpJsonResponse> => {
    const response = await this.clientService.getMyAllClient();
    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }



  getClientById = async (id : string):Promise<httpJsonResponse> => {
    const response = await this.clientService.getMyClientById(id);
    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }


  addOrUpdateClient = async (data: any):Promise<httpJsonResponse> => {
    let response:any;
    if(data.actiontype === TypeAction.insert){
      delete data.actiontype;
      response = await this.clientService.addClient(data);
    }
    else{
      delete data.actiontype;
      response = await this.clientService.updateClient(data);
    }

    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }


  deleteClient = async (idClient: string):Promise<httpJsonResponse> => {
    const response = await this.clientService.deleteClient(idClient);

    // TODO: Verification à faire
    if (response["status"] && response["data"] != null) {
      return this.api.format_Response(response);
    }
    else {
      return this.api.format_Response();
    }
  }



}


