import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppontmentsRepository from '../repositories/AppointmentsRepository';
import CreatAppointmentService from '../services/CreateAppointmentService';
import Appointment from '../models/Appointment';


const appointmentsRouter = Router();
const appointmentsRepository = new AppontmentsRepository();

appointmentsRouter.get ('/', (request, response) =>{
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
    console.log(request.body, 'body');
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreatAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({date: parsedDate, provider});
    
    return response.json(appointment);
    } catch (err) {
      return response.status(400).json({error: err.message});
    }
});

export default appointmentsRouter;