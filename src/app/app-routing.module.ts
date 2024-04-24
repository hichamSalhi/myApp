import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SensorComponent } from './sensor/sensor.component';
import { MachineComponent } from './machine/machine.component';
import { ManageMachinesComponent } from './manage-machines/manage-machines.component';
import { ManageSensorsComponent } from './manage-sensors/manage-sensors.component';
import { Login2Component } from './login2/login2.component';

const routes: Routes = [
  {path : '',component : LoginComponent},
  {path : 'home' ,component : HomeComponent,
    children: [
      {path: 'sensor',component : SensorComponent},
      {path : 'machine', component : MachineComponent},
      {path : 'manage/machines', component : ManageMachinesComponent},
      {path : 'manage/sensors', component : ManageSensorsComponent},
      {path : 'login2', component : Login2Component}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
