import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("settings")
class Setting {

  @PrimaryColumn()
  id: string;

  @Column()
  user: string;

  @Column()
  chat: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Setting }