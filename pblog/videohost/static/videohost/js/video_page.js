import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

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
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

const username = document.getElementById('username');
const upload = document.getElementById('upload');
const logout = document.getElementById('logout');
const enter = document.querySelector('.auth');

auth.onAuthStateChanged(function (user) {
  if (user) {
    username.style.display = "block"
    upload.style.display = "block"
    logout.style.display = "block"
    enter.style.display = "none"
    const userId = user.uid;
    const usernameRef = ref(db, "users/" + userId + "/username");

    get(usernameRef).then((snapshot) => {
      if (snapshot.exists()) {
        const usernameValue = snapshot.val();
        username.innerText = usernameValue;
        channel_name.innerText = usernameValue;
      } else {
        alert('данные об имени пользователя не найдены')
      }
    }).catch((error) => {
      //alert("Ошибка при получении имени пользователя" + error);
    });
    };
 });

function getVideoId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('videoId');
}

function loadVideo() {
    const videoId = getVideoId();
    if (videoId) {
        const videoRef = ref(db, `videos/${videoId}`);
        get(videoRef).then((snapshot) => {
            if (snapshot.exists()) {
                const video = snapshot.val();
                const videoPlayer = document.getElementById('videoPlayer');
                const videoTitle = document.getElementById('videoTitle');
                const videoAuthor = document.getElementById('videoAuthor');
                const videoUploadDate = document.getElementById('videoUploadDate');

                videoPlayer.src = video.url;
                videoTitle.innerText = video.title;
                videoAuthor.innerText = `Автор: ${video.userName}`;
                videoUploadDate.innerText = `Дата загрузки: ${video.uploadDate}`;
            } else {
                console.error('Видео не найдено');
            }
        }).catch((error) => {
            console.error('Ошибка базы данных:', error);
        });
    } else {
        console.error('ID видео не указан');
    }
}

window.onload = loadVideo;