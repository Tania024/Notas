import { Component } from '@angular/core';
import { NotasService } from '../notas.service';
import { NavigationExtras, Router } from '@angular/router';
import { Nota } from '../domain/notas';




@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {

  notas: Nota[] = [];
  notaSeleccionada: Nota | null = null;

  nuevoTitulo: string = '';
  nuevaDescripcion: string = '';
  nuevaFechaCreacion: string = '';

  columnas: string[] = ['id', 'titulo', 'descripcion', 'fechaCreacion', 'acciones'];

  constructor(private notasService: NotasService, private router: Router) {}

  seleccionarNota(nota: Nota) {
    this.notaSeleccionada = { ...nota };
  }

  agregarNota(titulo: string, descripcion: string, fechaCreacion: string) {
    const nuevoId = this.obtenerNuevoId();

    const nuevaNota: Nota = {
      id: nuevoId,
      titulo,
      descripcion,
      fechaCreacion: this.validarFecha(fechaCreacion),
    };

    this.notasService.agregarNota(nuevaNota);
    this.cargarNotas();
    this.limpiarCampos();
  }

  private obtenerNuevoId(): number {
    const idsExistente = this.notas.map(nota => nota.id);
    
    if (idsExistente.length === 0) {
      return 1;
    }
  
    return Math.max(...idsExistente) + 1;
  }

  private validarFecha(fecha: string): string {
    const dateObject = new Date(fecha);
    return isNaN(dateObject.getTime()) ? '' : fecha;
  }


  

  editarNota() {
    if (this.notaSeleccionada) {
      const id = Number(this.notaSeleccionada.id); // convierte a número
      if (!isNaN(id)) {
        this.notasService.editarNota(id, this.notaSeleccionada);
        this.notaSeleccionada = null;
        this.cargarNotas();
        console.log("Editado " + id);
      }
    }
  }
  
  

  cancelarEdicion() {
    this.notaSeleccionada = null;
  }

  eliminarNota(titulo: string) {
    this.notasService.eliminarNotaPorTitulo(titulo);
    console.log("Operación de eliminación completada.");
    this.cargarNotas();
  }

  cargarNotas() {
    this.notasService.getNotas().subscribe((notas) => {
      this.notas = notas;
    });
  }

  limpiarCampos() {
    this.nuevoTitulo = '';
    this.nuevaDescripcion = '';
    this.nuevaFechaCreacion = '';
    console.log("Se está limpiando");
  }

 
}
