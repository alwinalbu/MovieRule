import { ITheaterRepositories } from "./ITheaterRepositories";
import { ITheaterUseCases } from "./ITheaterUseCases";

export interface ITheaterDependencies {
  repositories: ITheaterRepositories;
  useCases: ITheaterUseCases;
}
