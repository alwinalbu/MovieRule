import { ITheaterDependencies } from "../application/theater/interfaces/ITheaterDependencies";
import * as repositories from '../infrastructure/database/mogodb/repositories'
import * as useCases from '../application/theater/useCases'

export const theaterDependencies:ITheaterDependencies  = {
repositories,
useCases,
};
