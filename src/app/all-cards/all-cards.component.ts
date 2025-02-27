import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'all-cards',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    FormsModule
  ],
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.setTableColumns(window.innerWidth);
  }

  constructor(
    private cardsHttpService: CardsHttpService,
    private dialog: MatDialog,
    private liveAnnouncer: LiveAnnouncer
  ) { }

  public dataSource = new MatTableDataSource<Card>();
  public displayedColumns = [
    'fname',
    'lname',
    'year',
    'sport',
    'manufacturer',
    'subSet',
    'cardNumber',
    'quantity',
    'psaValue',
    'edit'
  ];

  ngOnInit() {
    this.getAllCards();
  }

  ngAfterViewInit() {
    this.setTableColumns(window.innerWidth);
  }

  getAllCards() {
    this.cardsHttpService.getAllCards().subscribe(cardList => {
      this.dataSource.data = cardList;
      this.dataSource.sort = this.sort;
    });
  }

  onAddCardClick() {
    this.showAddCardDialog(new Card)
  }

  onUpdateCardClick(card: Card) {
    this.showAddCardDialog(card)
  }

  showAddCardDialog(card: Card) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { bottom: '50px' }
    const dialogRef = this.dialog.open(AddCardDialog, {
      data: { card }
    });

    dialogRef.afterClosed().subscribe({
      complete: () => this.getAllCards()
    });
  }

  showRemoveCardDialog(id: string) {
    const dialogRef = this.dialog.open(TwoButtonDialog, {
      data: {
        question: "Are you sure you want to remove this card?",
        buttonOne: "Nevermind",
        buttonTwo: "Remove It!",
        choice: false
      }
    });

    dialogRef.afterClosed().subscribe(choice => {
      if (choice) {
        this.cardsHttpService.deleteCard(id).subscribe({
          complete: () => this.getAllCards()
        });
      }
    });
  }

  handleAddCardError(): void {
    console.log("Error adding card!");
  }

  announceSortChange(sortState: Sort){
    if (sortState.direction) {
      this.liveAnnouncer.announce('Sorted ${sortState.direction}ending')
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  setTableColumns(viewWidth: number) {
    if (viewWidth > 900) {
      this.displayedColumns = [
        'fname',
        'lname',
        'year',
        'sport',
        'manufacturer',
        'subSet',
        'cardNumber',
        'quantity',
        'psaValue',
        'edit'
      ]
    } else if (viewWidth <= 900 && viewWidth > 750) {
      this.displayedColumns = [
        'fname',
        'lname',
        'year',
        'manufacturer',
        'subSet',
        'quantity',
        'psaValue',
        'edit'
      ]
    } else if (viewWidth <= 750 && viewWidth > 675) {
      this.displayedColumns = [
        'fname',
        'lname',
        'year',
        'manufacturer',
        'subSet',
        'quantity',
        'psaValue'
      ]
    } else if (viewWidth <= 675) {
      this.displayedColumns = [
        'fname',
        'lname',
        'year',
        'manufacturer',
        'psaValue'
      ]
    }
  }
}
