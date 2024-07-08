export interface IFindTheaterByIdUseCase {
  execute(id: string): Promise<any | null>;
}
