import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { CadastroRequisicao } from '../../core/entities/cadastro';
import { AutenticacaoService } from '../services/autenticacao.service';
import { emailInstitucionalValidator } from '../../core/validators/email-institucional.validator';
import { nomeCompletoValidator } from '../../core/validators/nome-completo.validator';
import { passwordsMatchValidator } from '../../core/validators/passwords-match.validator';
import { LoadingService } from '../../shared/services/loading/loading.service';

@Component({
  templateUrl: './cadastro.component.html',
  standalone: false,
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    public readonly loadingService: LoadingService,
    private readonly messageService: MessageService,
    private readonly _autenticacaoService: AutenticacaoService,
  ) {}

  get nome() {
    return this.cadastroForm.get('nome');
  }

  get matricula() {
    return this.cadastroForm.get('matricula');
  }

  get email() {
    return this.cadastroForm.get('email');
  }

  get senha() {
    return this.cadastroForm.get('senha');
  }

  get confirmarSenha() {
    return this.cadastroForm.get('confirmarSenha');
  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required, nomeCompletoValidator]],
        matricula: [null, Validators.required],
        email: [
          '',
          [Validators.required, Validators.email, emailInstitucionalValidator],
        ],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmarSenha: ['', Validators.required],
      },
      { validators: passwordsMatchValidator },
    );
  }

  cadastrarConta() {
    if (!this.cadastroForm.valid) {
      return this.cadastroForm.markAllAsTouched();
    }

    const requisicao: CadastroRequisicao = {
      matricula: this.cadastroForm.get('matricula')?.value,
      nome: this.cadastroForm.get('nome')?.value,
      email: this.cadastroForm.get('email')?.value,
      senha: this.cadastroForm.get('senha')?.value,
    };
    this._autenticacaoService.cadastrar(requisicao).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: `Conta criada com sucesso! Faça o login`,
        life: 3000,
      });
      this.router.navigate(['/login']);
    });
  }
}
