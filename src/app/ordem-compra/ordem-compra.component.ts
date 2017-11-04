import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario') public formulario: NgForm
  public idPedidoCompra: number

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {

    let pedido = new Pedido()
    pedido.endereco = this.formulario.value.endereco
    pedido.numero = this.formulario.value.numero
    pedido.complemento = this.formulario.value.complemento
    pedido.formaPagamento = this.formulario.value.formaPagamento
  
    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido: number) => {
        this.idPedidoCompra = idPedido
      })
  }
}
