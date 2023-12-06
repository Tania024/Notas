export class Nota {
    id: number;
    titulo?: string;
    descripcion?: string;
    fechaCreacion?: string;

    constructor(id: number, titulo?: string, descripcion?: string, fechaCreacion?: string) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.fechaCreacion = fechaCreacion;
    }
  }