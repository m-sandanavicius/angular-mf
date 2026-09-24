import { Routes } from '@angular/router'; import { loadRemoteModule } from '@angular-architects/native-federation'; import { StorefrontComponent } from './features/storefront.component';
export const routes: Routes=[
 {path:'',component:StorefrontComponent,title:'NOVA / Storefront'},
 {path:'cart',loadChildren:()=>loadRemoteModule('cart','./Routes').then(m=>m.routes),title:'NOVA / Your bag'},
 {path:'checkout',loadChildren:()=>loadRemoteModule('checkout','./Routes').then(m=>m.routes),title:'NOVA / Checkout'},
 {path:'admin',loadChildren:()=>loadRemoteModule('admin','./Routes').then(m=>m.routes),title:'NOVA / Admin'},
 {path:'**',redirectTo:''}];
