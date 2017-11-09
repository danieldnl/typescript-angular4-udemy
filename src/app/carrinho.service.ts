import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

export class CarrinhoService {

    public itens: ItemCarrinho[] = []

    public exibirCarrinho(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        //verificar se o item em questão já existe dentro do array de itens
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        } else {
            this.itens.push(itemCarrinho)
        }
    }

    public totalCarrinhoCompras(): number {
        let total = 0
        this.itens.map((item: ItemCarrinho) => {
            total += item.valor * item.quantidade
        })
        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
        if(itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public removerQuantidade(itemCarrinho: ItemCarrinho): void {
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
        if(itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade -= 1
            if(itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
            }
        }
    }

    public totalItens(): number {
        return this.itens.length
    }

    public limparCarrinho(): void {
        this.itens = []
    }

} 