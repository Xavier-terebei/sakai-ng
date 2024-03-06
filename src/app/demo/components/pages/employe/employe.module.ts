import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeComponent} from "./employe.component";
import {EmployeRoutingModule} from "./employe-routing.module";
import {CrudRoutingModule} from "../crud/crud-routing.module";
import {TableModule} from "primeng/table";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {RatingModule} from "primeng/rating";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {SliderModule} from "primeng/slider";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {DialogService} from "primeng/dynamicdialog";
import {ModalClientComponent} from "./modal/modal-client/modal-client.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SharedModule} from "primeng/api";



@NgModule({
    imports: [
        CommonModule,
        EmployeRoutingModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        DialogModule,
        ToolbarModule,
        FileUploadModule,
        CrudRoutingModule,
        InputTextareaModule,
        InputNumberModule,
        SharedModule,
        ConfirmDialogModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    declarations: [EmployeComponent,ModalClientComponent],
})
export class EmployeModule { }
