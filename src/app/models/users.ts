export class Users {
    // public id: string;
    public position: string;
    public office: string;
    public salary: number;
    public email: string;
    public firstName: string;
    public lastName: string;

    constructor(position: string, office: string, salary: number, email: string, firstName: string, lastName: string) {
        // this.id = id;
        this.position = position;
        this.office = office;
        this.salary = salary;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
