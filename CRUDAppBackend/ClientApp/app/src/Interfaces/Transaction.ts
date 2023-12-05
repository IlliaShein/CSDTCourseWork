export class Transaction {
    constructor(
        public id: number,
        public dollarsSum: number,
        public hryvniaSum: number,
        public participantsCount: number,
        public creationTime: Date
     ) {}
}