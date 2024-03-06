import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from "./client-routing.module";
import {ClientComponent} from "./client.component";
import {ToolbarModule} from "primeng/toolbar";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ModalClientsComponent} from "./modal/modal-clients/modal-clients.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [ClientComponent,ModalClientsComponent],
    imports: [
        CommonModule,
        ClientRoutingModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
    ]
})
export class ClientModule { }
