export function movie_link_generate(nameEng: string) {
  return nameEng
    .replace(/ /g, "-")
    .replace(/[ \-.,?!#@/%^*=\[\]_\+<`>'"(){]:;&]/g, "-");
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

  return { high: url, medium: posterMedium, small: posterSmall };
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
