export class PersonPayment {
    constructor(
        public id: number = 0,
        public name: string,
        public isPercent: boolean,
        public rate: number,
        public dollar: number,
        public hryvnia: number
    ) { }
}