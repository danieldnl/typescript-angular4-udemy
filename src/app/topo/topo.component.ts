import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
  }

  public pesquisar(termo: string): void {
    this.ofertas = this.ofertasService.pesquisarOfertas(termo)

    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log('Erro status: ',erro.status),
      () => console.log('Evento de streams finalizado!')
    )
  }

}
