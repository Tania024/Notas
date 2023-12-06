import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Nota } from './domain/notas';







@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private notasCollection: AngularFirestoreCollection<Nota>;

  constructor(private firestore: AngularFirestore) {
    this.notasCollection = firestore.collection<Nota>('notas');
  }

  getNotas(): Observable<Nota[]> {
    return this.notasCollection.valueChanges({ obtenerNuevoId: 'id' });
  }

  

  agregarNota(nuevaNota: Nota){
    this.notasCollection.add(nuevaNota);
    console.log("Se esta ejecutando")
  }

  eliminarNotaPorTitulo(titulo: string) {
    this.notasCollection.ref.where('titulo', '==', titulo).get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const notaRef = querySnapshot.docs[0].ref;

          return notaRef.delete();
        } else {
          console.log("No se encontró ninguna nota con el título proporcionado");
          return null;
        }
      })
      .then(() => {
        console.log("Nota eliminada exitosamente");
      })
      .catch((error) => {
        console.error("Error al eliminar la nota:", error);
      });
  }

  editarNota(id: number, nuevaNota: Nota) {
    this.notasCollection.ref.where('id', '==', id).get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const notaRef = querySnapshot.docs[0].ref;
  
          
          return notaRef.update(nuevaNota);
        } else {
          console.log("No se encontró ninguna nota con el título proporcionado");
          return null;
        }
      })
      .then(() => {
        console.log("Nota editada exitosamente");
      })
      .catch((error) => {
        console.error("Error al editar la nota:", error);
      });
  }
  
}
