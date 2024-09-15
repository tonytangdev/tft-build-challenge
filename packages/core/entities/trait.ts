export abstract class Trait {
  protected abstract _type: string;
  protected _name: string;
  protected _imgUrl: string;
  protected _tiers: number[];

  constructor(name: string, imgUrl: string, tiers: number[]) {
    this._name = name;
    this._imgUrl = imgUrl;
    this._tiers = tiers;
  }

  get name() {
    return this._name;
  }

  get imgUrl() {
    return this._imgUrl;
  }

  getTier(index: number) {
    return this._tiers[index];
  }
}
