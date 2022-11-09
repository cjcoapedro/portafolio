import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';
import { InfoPaginaService } from '../../services/info-pagina.service';



@Component({
  selector: 'app-portafolio-item',
  templateUrl: './portafolio-item.component.html',
  styleUrls: ['./portafolio-item.component.css']
})
export class PortafolioItemComponent implements OnInit {

  elProducto!: ProductoDescripcion;
  id!: string;

  fecha: string = new Date().toDateString();

  constructor( private route: ActivatedRoute,
               public productoService : ProductosService, 
               public _info: InfoPaginaService
               ) { }

  ngOnInit(): void {

    this.route.params
    .subscribe(parametros => {

      //console.log(parametros['idProducto']);

      this.productoService.getProducto(parametros['idProducto'])
      .subscribe((producto: any) =>{
        this.id = parametros['idProducto'];
        this.elProducto = producto;
        //console.log(this.id);
      })

    })

  }

}
