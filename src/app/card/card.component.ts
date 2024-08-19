import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Card } from '../models/card';
import { CardsHttpService } from '../cards.service';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ]
})
export class CardComponent {
  
  public dataSource = new MatTableDataSource<Card>();
  public firstName: any;
  public lastName: any;
  public year: any;
  public sport: any;
  public manufacturer: any;
  public subSet: any;
  public psaValue: any;
  public quantity: any;
  public cardNumber: any;
  public breakpoint: any;

  constructor(
    private cardsHttpService: CardsHttpService,
  ) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 6;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  }
  
  manufacturers = [
    "Collector's Choice",
    "Donruss",
    "Fleer",
    "Flair",
    "Hoops",
    "Leaf",
    "Pacific",
    "Score",
    "Skybox",
    "Topps",
    "Ultra",
    "Upper Deck",
  ];

  addCard() {
    var addCardRequest = {
      _id: Math.floor(Math.random() * (1000000)).toString(),
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
    this.cardsHttpService.addCard(addCardRequest).subscribe();
  }
}
