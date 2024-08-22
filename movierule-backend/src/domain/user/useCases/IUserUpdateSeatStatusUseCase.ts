

export interface IUserUpdateSeatStatusUseCase {
    execute: (screenId: string, selectedSeats: string[])=>Promise<boolean>
}