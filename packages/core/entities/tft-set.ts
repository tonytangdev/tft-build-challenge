import { Champion } from "./champion";
import { Item } from "./item";
import { Trait } from "./trait";

export abstract class TFTSet {
  protected _name: string;
  protected _version: string;
  protected _champions: Champion[];
  protected _traits: Trait[];
  protected _items: Item[];
}
