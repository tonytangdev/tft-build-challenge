import { Champion } from "./champion";
import { Trait } from "./trait";

export class Composition {
  private _name: string;
  private _champions: Champion[];
  private _traits: Trait[];

  constructor(name: string, champions: Champion[]) {
    this._name = name;
    this._champions = champions;
    this._traits = this.computeTraits();
  }

  private computeTraits(): Trait[] {
    throw new Error("Method not implemented.");
  }

  get name() {
    return this._name;
  }

  get champions() {
    return this._champions;
  }

  get traits() {
    return this._traits;
  }
}
