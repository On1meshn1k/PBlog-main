import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getDatabase, ref as dbRef, set, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Initialize Firebase
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

// Function to upload video and thumbnail
function uploadVideo(file, thumbnailFile, userId, videoTitle) {
    const sanitizedFileName = file.name.replace(/[.#$[\]]/g, '_');
    const storageRef = ref(storage, `users/${userId}/videos/${sanitizedFileName}`);
    const thumbnailRef = ref(storage, `users/${userId}/thumbnails/${sanitizedFileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    const thumbnailUploadTask = uploadBytesResumable(thumbnailRef, thumbnailFile);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById('uploadProgress').value = progress;
        },
        (error) => {
            console.error('Upload error:', error);
            document.getElementById('uploadMessage').innerText = 'Upload error';
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                thumbnailUploadTask.on('state_changed', null, null, () => {
                    getDownloadURL(thumbnailUploadTask.snapshot.ref).then((thumbnailURL) => {
                        document.getElementById('uploadMessage').innerText = 'Upload successful';

                        const videoData = {
                            url: downloadURL,
                            userId: userId,
                            fileName: file.name,
                            title: videoTitle,
                            thumbnailUrl: thumbnailURL,
                            uploadDate: new Date().toISOString()
                        };

                        const newVideoRef = push(dbRef(database, 'videos'));
                        set(newVideoRef, videoData)
                            .then(() => {
                                console.log('Video saved to database');
                            })
                            .catch((error) => {
                                console.error('Error saving video to database:', error);
                            });
                    });
                });
            });
        }
    );
}

// Event listener for upload button
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const thumbnailInput = document.getElementById('thumbnailInput');
    const thumbnailFile = thumbnailInput.files[0];
    const videoTitle = document.getElementById('videoTitleInput').value;

    const user = auth.currentUser;

    if (user && file && videoTitle && thumbnailFile) {
        const userId = user.uid;
        uploadVideo(file, thumbnailFile, userId, videoTitle);
    } else if (!user) {
        alert('Please log in');
    } else if (!file) {
        alert('Select a video to upload');
    } else if (!videoTitle) {
        alert('Enter a title for the video');
    } else if (!thumbnailFile) {
        alert('Select a thumbnail for the video');
    }
});
