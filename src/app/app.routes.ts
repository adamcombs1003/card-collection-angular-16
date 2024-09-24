import { Routes } from '@angular/router';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { CardComponent } from './card/card.component';
import { BaseballCardsComponent } from './baseball-cards/baseball-cards.component';
import { BasketballCardsComponent } from './basketball-cards/basketball-cards.component';

export const routes: Routes = [
    { path: '', redirectTo: '/all-cards', pathMatch: 'full'},
    { path: 'all-cards', component: AllCardsComponent },
    { path: 'baseball-cards', component: BaseballCardsComponent },
    { path: 'basketball-cards', component: BasketballCardsComponent },
    { path: 'card', component: CardComponent }
];
