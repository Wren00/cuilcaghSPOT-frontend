import React, { useState } from "react";
import { User } from "../types/users.types";

function PostUserPost() {
  const [user, setUser] = useState<User>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  return (
    <div>
      <form></form>
    </div>
  );
}

export { PostUserPost };
