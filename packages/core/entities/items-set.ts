import { Item } from "./item";

type TFTItemOrNull = Item | null;
type TFTItemsTuple = [TFTItemOrNull, TFTItemOrNull, TFTItemOrNull];

export class ItemsSet {
  private _items: TFTItemsTuple = [null, null, null];

  constructor(items: TFTItemsTuple = [null, null, null]) {
    this._items = items;
  }

  get items(): TFTItemsTuple {
    return this._items;
  }

  set items(objects: TFTItemsTuple) {
    this._items = objects;
  }

  get first(): TFTItemOrNull {
    return this._items[0];
  }

  get second(): TFTItemOrNull {
    return this._items[1];
  }

  get third(): TFTItemOrNull {
    return this._items[2];
  }
}
