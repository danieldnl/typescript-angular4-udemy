import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService }  from '../carrinho.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedido: number
  public itensCarrinho: ItemCarrinho[] = []

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(120)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required]),
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirCarrinho()
  }

  public confirmarCompra(): void {
    if(this.formulario.status === 'INVALID') {
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    } else {
      let pedido = new Pedido()
      pedido.endereco = this.formulario.value.endereco
      pedido.numero = this.formulario.value.numero
      pedido.complemento = this.formulario.value.complemento
      pedido.formaPagamento = this.formulario.value.formaPagamento
      pedido.itens = this.carrinhoService.exibirCarrinho()

      this.ordemCompraService.efetivarCompra(pedido)
        .subscribe((idPedido: number) => {
          this.idPedido = idPedido
          this.carrinhoService.limparCarrinho()
        })
    }
  }

  public adicionar(item: ItemCarrinho): void {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public remover(item: ItemCarrinho): void {
    this.carrinhoService.removerQuantidade(item)
  }

  public totalItens(): number {
    return this.carrinhoService.totalItens()
  }
}
