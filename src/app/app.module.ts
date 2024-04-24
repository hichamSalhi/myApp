import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material-module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SensorComponent } from './sensor/sensor.component';
import { MachineComponent } from './machine/machine.component';
import { ManageSensorsComponent } from './manage-sensors/manage-sensors.component';
import { ManageMachinesComponent } from './manage-machines/manage-machines.component';
import { Login2Component } from './login2/login2.component';

const ngxUiLoaderConfig : NgxUiLoaderConfig = {
  text : "Loading...",
  textColor : "#FFFFFF",
  textPosition : "center-center",
  bgsColor : "#1976D2",
  fgsColor : "#1976D2",
  fgsType : SPINNER.ballSpinClockwise,
  fgsSize : 60,
  hasProgressBar : false
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HomeComponent,
    HeaderComponent,
    SensorComponent,
    MachineComponent,
    ManageSensorsComponent,
    ManageMachinesComponent,
    Login2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MaterialModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
