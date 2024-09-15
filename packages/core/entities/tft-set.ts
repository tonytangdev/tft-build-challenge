import { Champion } from "./champion";
import { Item } from "./item";
import { Trait } from "./trait";

export abstract class TFTSet {
  protected _name: string;
  protected _version: string;
  protected _champions: Set<Champion>;
  protected _traits: Set<Trait>;
  protected _items: Set<Item>;
}
