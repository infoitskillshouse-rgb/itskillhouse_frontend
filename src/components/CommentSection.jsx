// src/components/blog/CommentSection.jsx
import { useState } from "react";

const CommentSection = ({ comments = [] }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      // API call here
      console.log("New comment:", text);
      setText("");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
          Post
        </button>
      </form>
      <div className="mt-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, idx) => (
            <div key={idx} className="border-t pt-2 mt-2">
              <p>{comment.text}</p>
              <span className="text-xs text-gray-500">By {comment.user}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
