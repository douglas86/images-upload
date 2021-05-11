import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState();

  const Submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log(file);

  return (
    <div>
      <form>
        <input
          type="file"
          accept=".jpg"
          onChange={(e) => setFile(e.target.value)}
        />
        <button type="submit" onClick={Submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
