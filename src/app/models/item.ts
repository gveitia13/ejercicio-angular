export class Item {
  private _id: string
  private _code: string
  private _description: string
  private _name: string
  private _category: string
  private _defaultPrice: number
  private _defaultCost: number

  constructor(id: string, code: string, description: string, name: string, category: string) {
    this._id = id;
    this._code = code;
    this._description = description;
    this._name = name;
    this._category = category;
    this._defaultCost = 0
    this._defaultPrice = 0
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get defaultPrice(): number {
    return this._defaultPrice;
  }

  set defaultPrice(value: number) {
    this._defaultPrice = value;
  }

  get defaultCost(): number {
    return this._defaultCost;
  }

  set defaultCost(value: number) {
    this._defaultCost = value;
  }
}
