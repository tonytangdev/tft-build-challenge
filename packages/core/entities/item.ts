export class Item {
  private _name: string;
  private _imgUrl: string;

  constructor(name: string, imgUrl: string) {
    this._name = name;
    this._imgUrl = imgUrl;
  }

  get name() {
    return this._name;
  }

  get imgUrl() {
    return this._imgUrl;
  }
}
