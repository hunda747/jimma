// import { useState, useEffect } from 'react';
// // import { projectStorage, projectFirestore, timestamp } from './config';

// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../firebase/config";

// const imageUploader = (file) => {
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [url, setUrl] = useState(null);

//   useEffect(() => {
//     if (!file) return;
//     // references
//     const sotrageRef = ref(storage, `files/${file.name}`);
//     const uploadTask = uploadBytesResumable(sotrageRef, file);

//     uploadTask.put(file).on(
//       "state_changed", (snapshot) => {
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       }, (error) => setError(error),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//         });
//       }
//     );
//   }, [file]);
//   // console.log(url);
//   return { progress, url, error };
// }

// export default imageUploader;
