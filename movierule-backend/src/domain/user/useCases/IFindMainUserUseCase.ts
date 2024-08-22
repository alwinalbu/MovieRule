
export interface IFindMainUserUseCase {
  execute(id: string,role:string): Promise<any | null>;
}
