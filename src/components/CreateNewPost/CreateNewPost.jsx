import React, { useState } from 'react';
import { Button, Form, Image, Card } from 'react-bootstrap';
import { errorHandler } from '../../utils/errorHandler';
import { api } from '../../apis/api';
import toast from 'react-hot-toast';

const CreateNewPost = ({ posts, setPosts }) => {
  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState([]);

  const disabled = files.length === 0 && !caption.trim();

  async function handleCreateNewPost(ev) {
    ev.preventDefault();
    try {
      const data = new FormData();
      data.append('caption', caption);
      for (let i = 0; i < files.length; i++) {
        data.append('image', files[i]);
      }
      const token = localStorage.getItem('token');
      const response = await api.post("/api/v1/posts/create", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      toast.success(response.data.message);
      ev.target.reset();
      setCaption('');
      setFiles([]);

      if (response.data.post) {
        setPosts([response.data.post, ...posts]);
      } else {
        const postsResponse = await api.get("/api/v1/posts");
        setPosts(postsResponse.data.posts);
      }
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  }

  return (
    <Card className="mb-4 shadow-sm rounded-4">
      <Card.Body>
        <Card.Title className="fw-bold mb-3">Create Post</Card.Title>
        <Form onSubmit={handleCreateNewPost}>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="What's on your mind?"
              value={caption}
              onChange={(ev) => setCaption(ev.target.value)}
              className="border-0 bg-light rounded-3 p-3"
              style={{ resize: "none", minHeight: 100 }}
            />
          </Form.Group>

          <div className="d-flex align-items-center mt-3 justify-content-between">
            <Form.Label
              htmlFor="image"
              className="btn btn-outline-primary rounded-pill px-4 mb-0"
              style={{ cursor: "pointer" }}
            >
              📷 Add Photos
            </Form.Label>

            <Form.Control
              type="file"
              id="image"
              multiple
              hidden
              onChange={(e) => setFiles(e.target.files)}
            />

            <Button
              disabled={disabled}
              variant="primary"
              type="submit"
              className="rounded-pill px-4"
            >
              Post
            </Button>
          </div>

          {files.length > 0 && (
            <div className="preview-images mt-3 d-flex flex-wrap gap-2">
              {Array.from(files).map((file, index) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  rounded
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              ))}
            </div>
          )}
        </Form>
        
        
      </Card.Body>
    </Card>
  );
};

export default CreateNewPost;




