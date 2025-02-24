import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { AddCardDialogData } from "../../models/add-card-dialog-data";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Card } from "../../models/card";
import { CommonModule } from "@angular/common";
import { CardsHttpService } from "src/app/cards.service";

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'add-card-dialog',
  templateUrl: 'add-card-dialog.component.html',
  standalone: true,
  styleUrls: [ './add-card-dialog.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ]
})
export class AddCardDialog {
  card: Card;

  constructor(
    private cardsHttpService: CardsHttpService,
    public dialogRef: MatDialogRef<AddCardDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddCardDialogData,
  ) { 
    this.card= data.card;
    console.log(this.card);
  }
  
  firstName     = "";
  lastName      = "";
  year          = "";
  sport         = "";
  manufacturer  = "";
  subSet        = "";
  psaValue      = 0;
  quantity      = 1;
  cardNumber    = "";

  manufacturers = [
    "Collector's Choice",
    "Donruss",
    "Finest",
    "Fleer",
    "Flair",
    "Hoops",
    "Leaf",
    "Pacific",
    "Score",
    "Skybox",
    "Stadium Club",
    "Topps",
    "Ultra",
    "Upper Deck",
  ];

  addCardForm = new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    yearFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    psaValueFormControl: new FormControl('', [Validators.required, Validators.pattern("^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$")])
  });

  matcher = new FormErrorStateMatcher();

  addCard() {
    this.cardsHttpService.addCard(this.card).subscribe();
    this.dialogRef.close(this.card);
  }

}
