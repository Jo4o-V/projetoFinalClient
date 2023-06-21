import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BsModalRef } from 'ngx-bootstrap/modal';
import ValidateForm from 'src/app/helpers/validateform_LoginSignup';
import { AuthService } from 'src/app/shared/services/auth.service';

interface Roles {
  name: string;
}

interface Status {
  name: string;
}

interface Gender {
  name: string;
}

@Component({
  selector: 'app-collaborators-create',
  templateUrl: './collaborators-create.component.html',
  styleUrls: ['./collaborators-create.component.css']
})
export class CollaboratorsCreateComponent implements OnInit {
  collaboratorForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private datePipe: DatePipe, private toast: NgToastService) { }

  ngOnInit(): void {
    this.collaboratorForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(14)]),
      // gender: new FormControl<Gender | null>(null, [Validators.required]), 
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(80), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      userName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      // role: new FormControl<Roles | null>(null, [Validators.required]),
      wage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999.99)]),
      // status: new FormControl<Status | null>(null, [Validators.required]), 
      dateCad: new FormControl('', [Validators.required, dateValidator])
    });
  }

  validateControl = (controlName: string) => {
    if(this.collaboratorForm.get(controlName).invalid && this.collaboratorForm.get(controlName).touched)
      return true;
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if(this.collaboratorForm.get(controlName).hasError(errorName))
      return true;
    return false;
  }

  createCollaborator() {
    if(this.collaboratorForm.valid) {
      this.auth.Register(this.collaboratorForm.value)
      .subscribe({
        next:(res=>{
          this.collaboratorForm.reset();
          this.toast.success({detail: "SUCESSO", summary:"Colaborador Cadastrado!", duration: 8000});
          this.router.navigate(['database/internal/collaborators']);
        }),
        error:(err=>{
          this.toast.error({detail: "ERRO", summary:err?.error.message, duration: 8000});
        })
      })

    } else{
      ValidateForm.validateAllFormFields(this.collaboratorForm)
    }
  }

  roles: Roles[] = [
    {name: 'Administrador'},
    {name: 'Funcionário'},
  ];

  status: Status[] = [
    {name: 'Ativo'},
    {name: 'Inativo'},
  ];

  genders: Gender[] = [
    {name: 'Feminino'},
    {name: 'Masculino'},
  ]
}

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const controlDateCad = control.value as Date;
  var todayDate = new Date();
  todayDate.setHours(0,0,0,0);

  if(controlDateCad <= todayDate) {
    return null;
  }
  else{
    return {"invalidDate":true}
  }
}