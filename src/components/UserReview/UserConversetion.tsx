import React, { useState, useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import { UserCommentHeader } from "./UserCommentHeader";
import { RestoraCommentHeader } from "./RestoraCommentHeader";
import { RestoraImage } from "./RestoraImage";
const UserConversetion = () => {
  const [comment, setComment] = useState("");
  const [displayedComments, setDisplayedComments] = useState<string[]>([]);

  const handleChnage = (e: any) => {
    e.preventDefault, setComment(e.target.value);
  };
  const handleClick = () => {
    if (comment.trim() !== "") {
      setDisplayedComments([...displayedComments, comment]);
      setComment("");
    }
  };

  return (
    <div className="mx-5 mb-10">
      <div>
        {displayedComments.map((displayedComment, index) => (
          <div key={index}>
            <div className="bg-gray-100 rounded-lg p-2 pl-2 mb-5">
              <RestoraCommentHeader />
              <div className="mt-2 mb-5 px-3">
                <p className="text-justify pr-5">{displayedComment}</p>
              </div>
            </div>
            <div className=" bg-gray-100 rounded-lg p-2 pl-2 mb-5">
              <UserCommentHeader />
              <div className=" mt-2 mb-5 px-3">
                <p className="text-justify pr-5">
                  The food was good,the steak was cooked perfectly and had a
                  great flavor. environment was welcoming, great service.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 ">
        <div className="flex">
          <RestoraImage />
          <div className="flex w-[100%] gap-5">
            <Input
              value={comment}
              onChange={handleChnage}
              placeholder="Write a Comment...."
            />
            <Button
              type="primary"
              style={{ height: "48px" }}
              htmlType="submit"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversetion;
