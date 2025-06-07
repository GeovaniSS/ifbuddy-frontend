import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AutenticacaoService } from '../services/autenticacao.service';
import { UsuarioService } from '../services/usuario.service';
import { LoadingService } from '../../shared/services/loading/loading.service';

@Component({
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _autenticacaoService: AutenticacaoService,
    private readonly _usuarioService: UsuarioService,
    public readonly loadingService: LoadingService,
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return this.loginForm.markAllAsTouched();
    }

    this._autenticacaoService.login(this.loginForm.value).subscribe({
      next: resposta => {
        this._usuarioService.login(resposta.estudanteId, resposta.token);
      },
    });
  }
}
