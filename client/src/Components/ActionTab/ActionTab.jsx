import React, { useState } from "react";
import style from "./ActionTab.module.css";
import Button from "../Button/Button";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import Request from "../../api/Request";
import Wrapper from "../Wrapper/Wrapper";
import Input from "../Input/Input";
function ActionTab(props) {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const deleteArticleHandler = async function (e) {
    try {
      const endPoint = `/articles/${props.id}`;
      await Request.delete(endPoint);
      props.dispatch.changeDeleteState((state) => !state);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePopUpHandler = function (e) {
    setIsUpdateClicked((state) => !state);
  };

  const updateArticleHandler = async function (e) {
    e.preventDefault();
    try {
      if (!title || !description) {
        return alert("please enter title and description to update");
      }

      const endPoint = `/articles/${props.id}`;

      const response = await Request.patch(
        endPoint,
        {
          title: title,
          description: description,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      props.dispatch.changeUpdateState((state) => !state);
      setIsUpdateClicked(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style["action_tab"]}>
      <ul className={style["action_list"]}>
        <li>
          <Button
            type="button"
            className={`${style["action_list__action_btn"]} ${style["danger"]}`}
            onClick={deleteArticleHandler}
          >
            <IoRemoveCircleOutline />
          </Button>
        </li>
        <li className={style["editable"]}>
          <Button
            type="button"
            className={`${style["action_list__action_btn"]} ${style["warning"]}`}
            onClick={updatePopUpHandler}
          >
            <AiOutlineEdit />
          </Button>
          {isUpdateClicked && (
            <Wrapper>
              <form
                encType="multipart/form-data"
                onSubmit={updateArticleHandler}
              >
                <Input
                  type={"text"}
                  id="title"
                  label="Title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  type={"text"}
                  id="description"
                  label="Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                  type={"file"}
                  id="image"
                  label="Image"
                  name="image"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    return setImage(e.target.files[0]);
                  }}
                />
                <Button className={style["btn_update"]}>Update</Button>
              </form>
            </Wrapper>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ActionTab;
