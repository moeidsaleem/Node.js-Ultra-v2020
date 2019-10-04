import { Container } from 'typedi';
import LoggerInstance from './logger'
import agendaFactory from 'agenda'

export default ({ mongoConnection, models} : { mongoConnection; models:{name:string; model:any}[] }) =>{
    try{
        models.forEach(m =>{
            Container.set(m.name, m.model)
        })
    const agendaInstance = agendaFactory({mongoConnection})
    Container.set('agendaInstance', agendaInstance);
    Container.set('logger', LoggerInstance);
    LoggerInstance.info("Agenda Injected");
    return { agenda: agendaInstance}
    }catch(e){
        LoggerInstance.error("Error Injecting in the container.");
        throw e;
    }
}
