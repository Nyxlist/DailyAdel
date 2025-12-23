const personalMessages = [
"Jangan lupa makan!",
"Your enemy is your own regent",
"The secret of happiness is freedom, the secret of freedom is courage.",
"The secret to courage is honor, and the secret to honor is love.",
"Time is money",
"High risk, high return",
"Kalau capek istirahat",
"Our task is simple, win",
"If you are down, remember to get back up"

];

const openings = [
  "Just a quick reminder that",
  "Take it easy on yourself today because",
  "Honestly, it’s pretty amazing how",
  "In case nobody told you yet,",
  "You might not feel it right now, but",
  "Look, the truth is that",
  "Whatever is on your mind, remember",
  "Something really good is coming because",
  "The way you're showing up lately proves",
  "Stop for a second and realize that",
  "I know things feel heavy, but",
  "Trust me when I say that",
  "You don't have to have it all figured out yet since",
  "It's okay to take a beat and recognize that",
  "Seriously, don't overlook the fact that",
  "Even on the days you feel stuck, remember",
  "The cool thing about your life right now is",
  "Just so we’re clear,",
  "If you need a sign to keep going, here it is:",
  "You’re doing a lot better than you think, and"
];

const middles = [
  " you’re handling things way better than you give yourself credit for",
  " even the messy parts of your journey are leading somewhere great",
  " you’ve got this inner spark that no one can blow out",
  " every little step you take is actually a huge deal",
  " you are slowly but surely becoming the person you’ve always wanted to be",
  " your energy is shifting things in ways you can’t even see yet",
  " you have a way of making the world feel a bit lighter",
  " you’re allowed to grow at your own pace without any pressure",
  " your heart is way too big to be dimmed by one bad day",
  " you’ve survived 100% of your hardest days so far",
  " you are making more progress than you realize",
  " your mistakes are just proof that you’re actually trying",
  " you’re allowed to be both a masterpiece and a work in progress",
  " that gut feeling telling you to keep going is 100% right",
  " you bring something to the table that nobody else can",
  " your resilience is actually your coolest trait",
  " the effort you’re putting in right now is going to pay off",
  " you’re learning how to protect your peace",
  " being kind to yourself is the best move you can make",
  " you have the power to flip the script at any time"
];

const endings = [
  " so just keep being you.",
  " and honestly? You’re doing just fine.",
  " so don’t be so hard on yourself.",
  " and the best part is, you're just getting started.",
  " so take a breath and let that sink in.",
  " which is a pretty cool thing if you think about it.",
  " so keep your chin up, okay?",
  " and I promise, it’s all going to work out.",
  " so give yourself some credit today.",
  " and that’s more than enough.",
  " so don't let anyone steal your peace.",
  " and things are going to click sooner than you think.",
  " so just focus on the next right step.",
  " and that's something to be really proud of.",
  " so keep that same energy moving forward.",
  " because you definitely deserve the best.",
  " and I’m rooting for you every step of the way.",
  " so just take it one day at a time.",
  " and honestly, the world needs more of that.",
  " so keep shining your light."
];

//------------------------------------------------------------------------------------------------------------
const music = document.getElementById("bg-music");
const leftChibi = document.querySelector(".chibi.left");

// autoplay after user interaction (browser rule)
document.body.addEventListener("click", () => {
  if (music.paused) {
    music.volume = 0.5;
    music.play().catch(() => {});
  }
}, { once: true });

let muted = false;

leftChibi.addEventListener("click", () => {
  muted = !muted;
  music.muted = muted;

  leftChibi.style.filter = muted
    ? "grayscale(100%) opacity(0.6)"
    : "none";
});

const rightChibi = document.querySelector(".chibi.right");

rightChibi.addEventListener("click", () => {
  if (music.muted) music.muted = false;

  let newVolume = music.volume + 0.1;
  if (newVolume > 1) newVolume = 0.1;

  music.volume = newVolume;

  // visual feedback
  rightChibi.style.transform = "scale(1.1)";
  setTimeout(() => {
    rightChibi.style.transform = "scale(1)";
  }, 150);
});

//------------------------------------------------------------------------
const card = document.getElementById("card");
const dateEl = document.getElementById("date");
const messageEl = document.getElementById("message");

let revealed = false;

card.addEventListener("click", () => {
  if (revealed) return;

  dateEl.classList.remove("solo");
  dateEl.classList.add("compact");

  messageEl.classList.remove("hidden");
  messageEl.classList.add("show");

  card.classList.add("revealed");
  revealed = true;
});

//-------------------------------------------------------------------------------------------------------
const STORAGE_KEY = "adelaide_message_index";

function getTodayDate() {
    const now = new Date();

  const day = now.toLocaleDateString(undefined, { weekday: "long" });
  const date = now.getDate();
  const month = now.toLocaleDateString(undefined, { month: "long" });
  const year = now.getFullYear();

  return `${day}, ${date}  ${month}  ${year}`;
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

const DAILY_MESSAGE_KEY = "adelaide_daily_message";
const DAILY_DATE_KEY = "adelaide_daily_date";

function getMessage() {
  const today = new Date().toDateString();

  const savedDate = localStorage.getItem(DAILY_DATE_KEY);
  const savedMessage = localStorage.getItem(DAILY_MESSAGE_KEY);

  // Same day → reuse message
  if (savedDate === today && savedMessage) {
    return savedMessage;
  }

  // New day → generate new message
  let message;
  let index = Number(localStorage.getItem(STORAGE_KEY)) || 0;

  if (index < personalMessages.length) {
    message = personalMessages[index];
    localStorage.setItem(STORAGE_KEY, index + 1);
  } else {
    message = generateCombinedMessage();
  }

  // Save for today
  localStorage.setItem(DAILY_DATE_KEY, today);
  localStorage.setItem(DAILY_MESSAGE_KEY, message);

  return message;
}

document.getElementById("date").textContent = getTodayDate();
document.getElementById("message").textContent = getMessage();
