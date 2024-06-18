import { Routes } from '@angular/router';
import { AllCardsComponent } from './all-cards/all-cards.component';

export const routes: Routes = [
    { path: '', redirectTo: '/all-cards', pathMatch: 'full'},
    { path: 'all-cards', component: AllCardsComponent },
];
