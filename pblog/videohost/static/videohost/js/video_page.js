import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref as dbRef, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfKH9o_5TIursPTAV3kgHRo45Sh6-2T4Y",
  authDomain: "pblog-8e245.firebaseapp.com",
  projectId: "pblog-8e245",
  storageBucket: "pblog-8e245.appspot.com",
  messagingSenderId: "438974043232",
  appId: "1:438974043232:web:592cecb687e77958c2df05",
  databaseURL: "https://pblog-8e245-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function getVideoIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadVideo() {
    const videoId = getVideoIdFromUrl();
    if (!videoId) {
        alert('Video ID not found');
        return;
    }

    const videoRef = dbRef(database, `videos/${videoId}`);
    get(videoRef).then((snapshot) => {
        if (snapshot.exists()) {
            const video = snapshot.val();
            const videoPlayer = document.getElementById('videoPlayer');
            const videoTitle = document.getElementById('videoTitle');
            const videoDescription = document.getElementById('videoDescription');
            const videoUploadDate = document.getElementById('videoUploadDate');

            videoPlayer.src = video.url;
            videoTitle.textContent = video.fileName;
            videoDescription.textContent = `Uploaded by ${video.userId}`;
            videoUploadDate.textContent = `Uploaded on ${video.uploadDate}`;
        } else {
            alert('Video not found');
        }
    }).catch((error) => {
        console.error('Error fetching video data:', error);
    });
}

window.onload = loadVideo;