import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref as dbRef, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

function loadVideos() {
    const videoListRef = dbRef(database, 'videos');
    onValue(videoListRef, (snapshot) => {
        const videoList = document.getElementById('videoList');
        videoList.innerHTML = '';

        snapshot.forEach((childSnapshot) => {
            const video = childSnapshot.val();
            const videoElement = document.createElement('div');
            videoElement.classList.add('vid-list');

            videoElement.innerHTML = `
                <a href="video.html?id=${childSnapshot.key}"><img src="${video.url}" class="thumbnail"></a>
                <div class="flex-div">
                    <img src="{% static 'videohost/images/Jack.png' %}">
                    <div class="vid-info">
                        <a href="video.html?id=${childSnapshot.key}">${video.fileName}</a>
                        <p>Uploaded by User</p>
                        <p>${video.uploadDate}</p>
                    </div>
                </div>
            `;

            videoList.appendChild(videoElement);
        });
    });
}

window.onload = loadVideos;
