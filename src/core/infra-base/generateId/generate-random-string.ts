import { IdGenerator } from "src/core/domain/interfaces/id-generator.interface";

export class GenerateRandomString implements IdGenerator<string> {
  private characters: string;
  constructor(private readonly length: number) {
    this.characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    console.log("GenerateRandomString dependencies initialized...");
  }
  generateId(): string {
    let result = "";
    const charactersLength = this.characters.length;
    for (let i = 0; i < this.length; i++) {
      result += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return result;
  }
}
