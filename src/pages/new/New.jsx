import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import {
  getStorage,
  ref,
    uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
const New = ({ inputs, title }) => {
  const [movie, setMovie] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (item) => {
    const storage = getStorage(app);
    console.log(item.file.name);
    const imageRef = ref(storage, `item/${item.file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, item.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setMovie((prev) => {
            return { ...prev, [item.label]: url };
          });
          setUploaded((prev) => prev + 1);
        });
      }
    );
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload({ file: image, label: "img" });
  };
  console.log(movie);
  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput" key={1}>
                <label>Image</label>
                <input
                  name="img"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    name={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </form>
            <div className="buttonContainer">
              {uploaded ? (
                <button onClick={handleSubmit}>Create</button>
              ) : (
                <button onClick={handleUpload}>Upload</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
