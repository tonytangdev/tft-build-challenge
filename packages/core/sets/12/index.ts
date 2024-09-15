import championsJSON from "./champions.json";
import originsJSON from "./origins.json";
import classesJSON from "./classes.json";
import itemsJSON from "./items.json";
import { TFTSet12 } from "./tft-set";
import { Champion, Item } from "../../entities";
import { Origin } from "../../entities/origin";
import { Class } from "../../entities/class";

const origins = originsJSON.map((origin) => {
  return new Origin(origin.name, origin.imgUrl, origin.tiers);
});

const classes = classesJSON.map((tftClass) => {
  return new Class(tftClass.name, tftClass.imgUrl, tftClass.tiers);
});
const champions = new Set(
  championsJSON.map((champion) => {
    const championOrigins = origins.filter((origin) => {
      return champion.origins.includes(origin.name);
    });

    const championClasses = classes.filter((tftClass) => {
      return champion.classes.includes(tftClass.name);
    });

    return new Champion(
      champion.name,
      championOrigins,
      championClasses,
      champion.cost,
      champion.imgUrl,
    );
  }),
);
const items = new Set(
  itemsJSON.map((item) => {
    return new Item(item.name, item.imgUrl);
  }),
);

const traits = new Set([...origins, ...classes]);
export const TFTSet = new TFTSet12(champions, traits, items);

// console.log(TFTSet.toString());
