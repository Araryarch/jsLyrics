const $audio = document.querySelector(".audio");
const $lyric_word = document.querySelector(".lyric-word");

const liricle = new Liricle();
const typewriter = new Typewriter($lyric_word, {
  loop: false,
  delay: 50,
});

let currentLineIndex = 0;

liricle.on("load", (data) => {
  displayFirstLine(data);
});

liricle.on("loaderror", (error) => {
  console.error("Failed to load lyrics:", error.message);
});

liricle.on("sync", (line, word) => {
  highlightLineAndWord(line, word);
});

liricle.load({ url: "./audio/lyrics.lrc" });

liricle.offset = 200;

$audio.addEventListener("timeupdate", () => {
  const time = $audio.currentTime;
  liricle.sync(time, false);
});

function displayFirstLine(data) {
  const lyricsContainer = document.querySelector(".lyrics-container");

  const line = data.lines[currentLineIndex];
  const lyricLine = document.createElement("div");
  lyricLine.classList.add("lyric-line");
  lyricsContainer.appendChild(lyricLine);

  currentLineIndex++;
}

function highlightLineAndWord(line, word) {
  const lyricsContainer = document.querySelector(".lyrics-container");
  const allLines = document.querySelectorAll(".lyric-line");
  allLines.forEach((lineElement) => {
    lineElement.classList.remove("active");
  });

  const lyricLine = document.createElement("div");
  lyricLine.classList.add("lyric-line");
  lyricsContainer.innerHTML = "";

  lyricsContainer.appendChild(lyricLine);
  lyricLine.classList.add("active");

  typewriter.deleteAll(1).typeString(line.text).start();

  if (word) {
    $lyric_word.innerText = word.text;
    $lyric_word.classList.add("active");
  } else {
    $lyric_word.classList.remove("active");
  }
}
