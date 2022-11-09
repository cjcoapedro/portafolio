import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Producto } from '../interfaces/producto.interface'
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos(){

      return new Promise<void>( (resolve, reject)=>{
        this.http.get<Producto[]>('https://angular-html-5e4b2-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) =>{
  
            //console.log(resp);
            this.productos = resp,
            setTimeout(() => {
              this.cargando = false;
            }, 2000);
            resolve();
          });
          
      });

  }

  getProducto (id: string){
    return this.http.get(`https://angular-html-5e4b2-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string){

      if( this.productos.length === 0){
          //Cargar productos
          this.cargarProductos().then( ()=>{
            //ejecutar después de tener los productos
            //Aplicar filtro
            this.filtrarProductos(termino);
          });
      }else{
        //alicar el filtro
        this.filtrarProductos(termino);
      
      }
      //console.log(this.productosFiltrado)
  };

private filtrarProductos( termino : string){
  //console.log(this.productos);
  this.productosFiltrado = [];

  termino = termino.toLocaleLowerCase();

  this.productos.forEach(prod =>{

    const tituloLower = prod.titulo.toLocaleLowerCase();

    if(prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino) >= 0){
      this.productosFiltrado.push(prod);
    }
  })
}

}
