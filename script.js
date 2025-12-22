const personalMessages = [
  // your full personal messages here
];

const openings = [
  // opening phrases
];

const middles = [
  // middle phrases
];

const endings = [
  // ending phrases
];

const STORAGE_KEY = "adelaide_message_index";

function getTodayDate() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function generateCombinedMessage() {
  const o = openings[Math.floor(Math.random() * openings.length)];
  const m = middles[Math.floor(Math.random() * middles.length)];
  const e = endings[Math.floor(Math.random() * endings.length)];
  return `${o} ${m} ${e}`;
}

function getMessage() {
  let index = Number(localStorage.getItem(STORAGE_KEY)) || 0;

  if (index < personalMessages.length) {
    const msg = personalMessages[index];
    localStorage.setItem(STORAGE_KEY, index + 1);
    return msg;
  }

  return generateCombinedMessage();
}

document.getElementById("date").textContent = getTodayDate();
document.getElementById("message").textContent = getMessage();
