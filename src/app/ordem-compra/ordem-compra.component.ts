import { Component, OnInit } from '@angular/core';

import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  //Atributos de validação
  public enderecoValido: boolean
  public numeroValido: boolean
  public complementoValido: boolean
  public formaPagamentoValido: boolean

  //atributos de estado primitivo(pristine)
  public enderecoEstadoPrimitivo: boolean = true
  public numeroEstadoPrimitivo: boolean = true
  public complementoEstadoPrimitivo: boolean = true
  public formaPagamentoEstadoPrimitivo: boolean = true

  public formEstado: string = 'disabled'

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    //this.ordemCompraService.efetivarCompra()
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco
    this.enderecoEstadoPrimitivo = false
    if(this.endereco.length > 3) {
      this.enderecoValido = true
    } else {
      this.enderecoValido = false
    } 
    this.habilitaForm()
  }

  public setNumero(numero: string): void {
    this.numero = numero
    this.numeroEstadoPrimitivo = false
    if(this.numero.length > 1) {
      this.numeroValido = true
    } else {
      this.numeroValido = false
    }
    this.habilitaForm()
  }

  public setComplemento(complemento: string): void {
    this.complemento = complemento
    this.habilitaForm()
  }

  public setFormaPagamento(formaPagamento: string): void {
    this.formaPagamento = formaPagamento
    this.formaPagamentoEstadoPrimitivo = false
    if(this.formaPagamento !== '') {
      this.formaPagamentoValido = true
    } else {
      this.formaPagamentoValido = false
    }
    this.habilitaForm()
  }

  private habilitaForm(): void {
    if(this.enderecoValido === true && this.numeroValido === true && this.formaPagamentoValido === true) {
      this.formEstado = ''
    } else {
      this.formEstado = 'disabled'
    }
  }

  public confirmarCompra(): void {
    let pedido: Pedido = new Pedido()
    pedido.endereco = this.endereco
    pedido.numero = this.numero
    pedido.complemento = this.complemento
    pedido.formaPagamento = this.formaPagamento

    this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
    })
  }

}
