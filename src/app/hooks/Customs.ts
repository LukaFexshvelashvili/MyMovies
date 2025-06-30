export function movie_link_generate(nameEng: string) {
  return nameEng
    .replace(/ /g, "-")
    .replace(/[ \-.,?!#@/%^*=\[\]_\+<`>'"(){]:;&]/g, "-");
}
export function get_type_link(type: string | number) {
  switch (type) {
    case 0:
    case "0":
      return "movie";
    case 1:
    case "1":
      return "tv-show";
    case 2:
    case "2":
      return "animation";
    case 3:
    case "3":
      return "anime";
    default:
      return "movie";
  }
}
export function get_type_link_geo(type: string | number) {
  switch (type) {
    case 0:
    case "0":
      return "ფილმი";
    case 1:
    case "1":
      return "სერიალი";
    case 2:
    case "2":
      return "ანიმაცია";
    case 3:
    case "3":
      return "ანიმე";
    default:
      return "ფილმი";
  }
}

export function image_resize(url: string | undefined | null): {
  high: string;
  medium: string;
  small: string;
} {
  if (!url) {
    return { high: "undefined", medium: "undefined", small: "undefined" };
  }
  const posterMedium = url.replace(
    /\.(jpg|jpeg|png|gif|webp)$/i,
    (_, ext) => `_sm.${ext}`
  );
  const posterSmall = url.replace(
    /\.(jpg|jpeg|png|gif|webp)$/i,
    (_, ext) => `_sm2.${ext}`
  );

  return {
    high: "https://cdn.moviesgo.ge/" + url,
    medium: "https://cdn.moviesgo.ge/" + posterMedium,
    small: "https://cdn.moviesgo.ge/" + posterSmall,
  };
}
export function decodeHtmlEntities(str: string): string {
  const entities: { [key: string]: string } = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
  };

  return str.replace(/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      if (entity[1].toLowerCase() === "x") {
        return String.fromCharCode(parseInt(entity.slice(2), 16));
      } else {
        return String.fromCharCode(parseInt(entity.slice(1), 10));
      }
    } else if (entities[entity.toLowerCase()]) {
      return entities[entity.toLowerCase()];
    }
    return match;
  });
}
