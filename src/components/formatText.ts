export default function formatText(text: string) {
  const lowerWords = ["de", "del", "la", "las", "los", "el", "en", "por", "para", "con", "a", "y", "o"];

  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index !== 0 && lowerWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
