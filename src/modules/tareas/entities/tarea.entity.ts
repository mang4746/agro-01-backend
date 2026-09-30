import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TareaEstado {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADA = 'COMPLETADA',
}

export enum TareaPrioridad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

@Entity({
  name: 'TAREAS',
})
export class Tarea {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'number' })
  id!: number;

  @Column({ name: 'TITULO', type: 'varchar2', length: 150 })
  titulo!: string;

  @Column({ name: 'DESCRIPCION', type: 'varchar2', length: 500, nullable: true })
  descripcion!: string | null;

  @Column({
    name: 'ESTADO',
    type: 'varchar2',
    length: 20,
    default: TareaEstado.PENDIENTE,
  })
  estado!: TareaEstado;

  @Column({
    name: 'PRIORIDAD',
    type: 'varchar2',
    length: 20,
    default: TareaPrioridad.MEDIA,
  })
  prioridad!: TareaPrioridad;

  @Column({ name: 'FECHA_VENCIMIENTO', type: 'date', nullable: true })
  fechaVencimiento!: Date | null;

  @Column({ name: 'FECHA_CREACION', type: 'timestamp' })
  fechaCreacion!: Date;

  @Column({ name: 'FECHA_ACTUALIZACION', type: 'timestamp' })
  fechaActualizacion!: Date;
}