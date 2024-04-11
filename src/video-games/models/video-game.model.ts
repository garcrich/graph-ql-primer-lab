export interface VideoGame {
    id: string;
    title: string;
    yearReleased: number;
    genre: string;
    publisher: string;
    price: number;
    platform: string;
}

export interface VideoGameConnection {
    games: VideoGame[]
    totalCount: number
    totalPages: number
    currentPage: number

}