import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CardsHttpService } from '../cards.service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { TwoButtonDialog } from '../dialogs/two-button-dialog/two-button-dialog.component';
import { AddCardDialog } from '../dialogs/add-card-dialog/add-card-dialog.component';
import { Card } from '../models/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'all-cards',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    RouterLinkActive
  ],
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit, AfterViewInit {

  cards: Card[] = [];
  dataSource = new MatTableDataSource<Card>();
  removeId!: string;
  choice!: string;
  addCardRequest!: Card;
  updateCardRequest!: Card;
  firstName: any;
  lastName: any;
  year: any;
  sport: any;
  manufacturer: any;
  subSet: any;
  psaValue: any;
  quantity: any;
  cardNumber: any;
  displayedColumns: string[] = [
    'name',
    'sport',
    'year',
    'manufacturer',
    'subSet',
    'cardNumber',
    'psaValue',
    'remove'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private cardsHttpService: CardsHttpService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCards();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCards() {
    this.cardsHttpService.getAllCards().subscribe(cardList => {
      this.cards = cardList;
      this.dataSource.data = this.cards;
    });
  }

  showRemoveCardDialog(id: string) {
    this.removeId = id;
    const dialogRef = this.dialog.open(TwoButtonDialog, {
      data: {
        question: "Are you sure you want to remove this card?",
        buttonOne: "Nevermind",
        buttonTwo: "Remove It",
        choice: false
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.cardsHttpService.deleteCard(this.removeId).subscribe({
          complete: () => this.getAllCards()
        });
      }
    });
  }

  showAddCardDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { bottom: '50px' }
    const dialogRef = this.dialog.open(AddCardDialog, {
      data: {
        addCardRequest: new Card()
      }
    });
  }

  addCard() {
    this.addCardRequest = {
      _id: "",
      firstName: this.firstName,
      lastName: this.lastName,
      year: this.year,
      sport: this.sport,
      manufacturer: this.manufacturer,
      subSet: this.subSet,
      cardNumber: this.cardNumber,
      quantity: this.quantity,
      psaValue: this.psaValue
    }

    this.cardsHttpService.addCard(this.addCardRequest).subscribe({
      complete: () => this.getAllCards(),
      error: () => this.handleAddCardError()
    });

  }

  handleAddCardError(): void {
    console.log("Error adding card!");
  }

}
