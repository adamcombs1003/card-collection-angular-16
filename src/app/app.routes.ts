import { Routes } from '@angular/router';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { CardComponent } from './card/card.component';

export const routes: Routes = [
    { path: '', redirectTo: '/all-cards', pathMatch: 'full'},
    { path: 'all-cards', component: AllCardsComponent },
    { path: 'card', component: CardComponent }
];
