export class Person {
  constructor(private firstName: string, private lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}
