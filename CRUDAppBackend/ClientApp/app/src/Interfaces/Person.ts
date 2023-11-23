export class Person {
    constructor(
        public id: number = 0,
        public name: string,
        public role: string,
        public rate: number,
        public isPercent: boolean,
        public phoneNumber: string | null,
        public email: string | null
    ) { }
}