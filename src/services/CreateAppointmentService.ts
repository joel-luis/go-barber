import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {

       public async execute({date, provider}: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        
        const appointmentDate = startOfHour(date);

        const findAppointmetInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmetInSameDate) {
        throw Error('Horário já reservado')
        
    }        
        const appointment = appointmentsRepository.create({
        provider, 
        date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

     return appointment;
    }
}

export default CreateAppointmentService;