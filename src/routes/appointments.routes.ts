import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository} from 'typeorm';

import CreatAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get ('/', (request, response) =>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
    console.log(request.body, 'body');
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreatAppointmentService();

    const appointment = await createAppointment.execute({date: parsedDate, provider});
    
    return response.json(appointment);
    } catch (err) {
      return response.status(400).json({error: err.message});
    }
});

export default appointmentsRouter;