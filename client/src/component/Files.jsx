import React, { useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";

const Files = () => {
  const [profileImg, setProfileImg] = useState("");

  const onFileChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    axios
      .post("http://localhost:5000/api/user-profile", formData, {})
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <form action="" onSubmit={onSubmit}>
            <input type="file" onChange={onFileChange} />
            <button className="btn btn-primary">Upload</button>
          </form>
        </Row>
      </Container>
    </div>
  );
};

export default Files;
