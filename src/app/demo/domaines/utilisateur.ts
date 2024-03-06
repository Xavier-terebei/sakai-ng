import {Action} from "./actions";

export interface Utilisateur extends Action{
  id?: string;
  idutilisateur?: string;
  nomutilisateur?: string;
  prenomutilisateur?: string;
  emailutilisateur?: string;
  contactutilisateur?: string;
}
