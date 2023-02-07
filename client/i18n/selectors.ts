import {CURRENCIES, LOCALES} from "./constants";

export function formatPrice(price: number, format: "locale" | "iso" = "locale") {
  const country = "AR";

  switch (format) {
    case "iso": {
      return `${Number(price).toFixed(2)} ${CURRENCIES[country]}`;
    }

    case "locale":
    default: {
      return Number(price).toLocaleString(LOCALES[country], {
        style: "currency",
        currency: CURRENCIES[country],
      });
    }
  }
}
