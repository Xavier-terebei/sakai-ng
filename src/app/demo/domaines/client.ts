import {Action} from "./actions";

export interface Client extends Action{
  id?: string;
  idclient?: string;
  //idClient?: string;
  nomclient?: string;
  prenomclient?: string;
  dateclient?: string;
  adresseclient?: string;
  contactclient?: string;
}
