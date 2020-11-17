import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
   public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointmet = await this.findOne({
      where: {date},
    });

    return findAppointmet || null;
  }
}

export default AppointmentsRepository;