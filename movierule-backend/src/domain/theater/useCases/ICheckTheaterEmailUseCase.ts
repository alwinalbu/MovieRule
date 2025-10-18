export interface ICheckTheaterEmailUseCase {
  execute(email: string): Promise<boolean>;
}
