// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfKH9o_5TIursPTAV3kgHRo45Sh6-2T4Y",
    authDomain: "pblog-8e245.firebaseapp.com",
    projectId: "pblog-8e245",
    storageBucket: "pblog-8e245.appspot.com",
    messagingSenderId: "438974043232",
    appId: "1:438974043232:web:592cecb687e77958c2df05",
    databaseURL: "https://pblog-8e245-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)

// Функция для загрузки видео
function uploadVideo(file, userId) {
    const storageRef = ref(storage, `users/${userId}/videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Обновление состояния загрузки
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('uploadProgress').value = progress;
        },
        (error) => {
            // В случае ошибки загрузки
            console.error('Ошибка загрузки:', error);
            document.getElementById('uploadMessage').innerText = 'Ошибка загрузки';
        },
        () => {
            // По завершении загрузки
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // Получение URL загруженного видео
                console.log('Файл доступен по ссылке:', downloadURL);
                document.getElementById('uploadMessage').innerText = 'Видео успешно загружено';
            });
        }
    );
}

// Обработчик события для кнопки загрузки
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const user = auth.currentUser;

    if (user && file) {
        const userId = user.uid;
        uploadVideo(file, userId);
    } else if (!user) {
        alert('Пожалуйста, войдите в систему');
    } else {
        alert('Выберите видео для загрузки');
    }
});