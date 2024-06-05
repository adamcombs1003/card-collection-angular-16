import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { TwoButtonDialogData } from "./two-button-dialog-data";


  @Component({
    selector: 'two-button-dialog',
    templateUrl: 'two-button-dialog.component.html',
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogModule
    ]
  })
  export class TwoButtonDialog {
    choice: boolean | undefined;

    constructor(
      public dialogRef: MatDialogRef<TwoButtonDialog>,
      @Inject(MAT_DIALOG_DATA) public data: TwoButtonDialogData,
    ) { }

  }
