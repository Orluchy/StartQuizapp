const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const RecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = RecentScore;
