import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository} from 'typeorm';

import CreatAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get ('/', async (request, response) =>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
    console.log(request.body, 'body');
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreatAppointmentService();

    const appointment = await createAppointment.execute({date: parsedDate, provider_id});
    
    return response.json(appointment);
    } catch (err) {
      return response.status(400).json({error: err.message});
    }
});

export default appointmentsRouter;