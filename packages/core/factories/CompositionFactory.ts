import { Composition } from "../entities";
import { TFTSet } from "../entities/tft-set";

export abstract class CompositionFactory {
  abstract createComposition(tftSet: TFTSet): Composition;
}
