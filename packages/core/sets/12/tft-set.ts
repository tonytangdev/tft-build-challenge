import { Champion, Item, Trait } from "../../entities";
import { TFTSet } from "../../entities/tft-set";

export class TFTSet12 extends TFTSet {
  constructor(champions: Set<Champion>, traits: Set<Trait>, items: Set<Item>) {
    super();
    this._name = "Set 12";
    this._version = "14.18";
    this._champions = champions;
    this._traits = traits;
    this._items = items;
  }

  toString() {
    return JSON.stringify({
      name: this._name,
      version: this._version,
      champions: Array.from(this._champions),
      traits: Array.from(this._traits),
    });
  }
}
