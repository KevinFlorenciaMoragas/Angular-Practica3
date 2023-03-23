import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceService } from 'services/service.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  edad = false;
  user : User[] = [];
  formularioDatos: User[] = [];
  fecha: any;
  fechaMin: any;
  nombre: FormControl = new FormControl<string | null>("", { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15), this.checkName], nonNullable: true })
  apellido1: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
  apellido2: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(15)])
  email: FormControl = new FormControl('', [Validators.required, Validators.email])
  dni: FormControl = new FormControl<string | null>("", { validators: [Validators.required, Validators.maxLength(9), this.checkDNI], nonNullable: true })
  fnacimiento: FormControl = new FormControl('', Validators.required)
  sexo: FormControl = new FormControl('', Validators.required)
  nombrePadre: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(15)])
  apellidoPadre: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(15)])
  nombreMadre: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(15)])
  apellidoMadre: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(15)])
  form: FormGroup = new FormGroup({
    nombre: this.nombre,
    apellido1: this.apellido1,
    apellido2: this.apellido2,
    email: this.email,
    dni: this.dni,
    fnacimiento: this.fnacimiento,
    sexo: this.sexo,
    nombrePadre: this.nombrePadre,
    apellidoPadre: this.apellidoPadre,
    nombreMadre: this.nombreMadre,
    apellidoMadre: this.apellidoMadre
  });
  
  constructor(private http:ServiceService) {
    // http.createUsers(this.user).subscribe(data=>{})
  }

  // Clic(datos: any) {
  //   console.log(datos)
  //   this.UsersServices.sendUser(datos)
  // }


postData(){
  this.http.createUsers(this.form.value).subscribe(data=>{
    console.log(data)
  })
}


  ngOnInit(): void {
    this.fecha = new Date().toISOString().substring(0, 10);
    this.fechaMin = new Date(1930, 0, 1).toISOString().substring(0, 10);

  }
  checkEdad() {
    let boolean:boolean = true;
    let fechaActual:Date = new Date();
    let ano:number = fechaActual.getFullYear();
    let input = document.getElementById("fnacimiento") as HTMLInputElement;
    let inputValue:string = input.value;
    let fechaNacimiento:Date = new Date(inputValue)
    let anoNacimiento:number = fechaNacimiento.getFullYear();
    let operacion:number = ano - anoNacimiento;
    if (operacion >= 18) {
      boolean = true;
      return boolean;
    } else {
      boolean = false;
      return boolean;
    }
  }
  checkName(campo: FormControl) {
    let nombreProhibidos = ["Hitler", "Franco", "Mussolini"];
    for (let i = 0; i < nombreProhibidos.length; i++) {
      if (campo.value === nombreProhibidos[i]) {
        return { nombreIncorrecto: true };
      } 
    }
    return null;
  }

  checkDNI(dni: FormControl) {
    let dniArray: string = dni.value.split("");
    let dniInput: string = dni.value.substring(0, dni.value.length - 1);
    let dniNumeros: number = parseInt(dniInput);
    let result: number | null = dniNumeros % 23;
    let letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    if (result >= 0) {
      console.log(result)
      let letraSeleccionada: string | null;
      letraSeleccionada = letras[result];
      let letraDni: string = dniArray[8];
      if (letraSeleccionada.toUpperCase() === letraDni.toUpperCase()) {
        return null;
      } else {
        return { letraIncorrecta: true };
      }
    } else {
      return null;
    }

  }
  
}
export interface User {
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  dni: string;
  fnacimiento: Date;
  sexo: string;
  nombrePadre: string;
  apellidoPadre: string;
  nombreMadre: string;
  apellidoMadre: string;
}