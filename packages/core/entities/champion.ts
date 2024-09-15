import { Class } from "./class";
import { ItemsSet } from "./items-set";
import { Origin } from "./origin";

export class Champion {
  private _name: string;
  private _origins: Origin[];
  private _classes: Class[];
  private _cost: number;
  private _items: ItemsSet;
  private _imgUrl: string;
  private _starLevel: number;

  constructor(
    name: string,
    origins: Origin[],
    classes: Class[],
    cost: number,
    imgUrl: string,
    starLevel = 1,
    items: ItemsSet = new ItemsSet(),
  ) {
    this._name = name;
    this._origins = origins;
    this._classes = classes;
    this._cost = cost;
    this._imgUrl = imgUrl;
    this._starLevel = starLevel;
    this._items = items;
  }

  get name(): string {
    return this._name;
  }

  get origin(): Origin[] {
    return this._origins;
  }

  get classes(): Class[] {
    return this._classes;
  }

  get cost(): number {
    return this._cost;
  }

  get items(): ItemsSet {
    return this._items;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  get starLevel(): number {
    return this._starLevel;
  }
}
