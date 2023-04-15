import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoAddOutline } from "react-icons/io5";
import Flex from "../../Layouts/Flex/Flex";
import Card from "../../Components/Card/Card";
import ActionTab from "../../Components/ActionTab/ActionTab";
import CardTitle from "../../Components/CardTitle/CardTitle";
import CardImage from "../../Components/CardImage/CardImage";
import CardDescription from "../../Components/CardDescription/CardDescription";
import CardFooter from "../../Components/CardFooter/CardFooter";
import Request from "../../api/Request";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import style from "./Home.module.css";
import Wrapper from "../../Components/Wrapper/Wrapper";
import Input from "../../Components/Input/Input";
const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [isArticleAdded, setIsArticleAdded] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const endPoint = "/articles";

        const response = await Request.get(endPoint);

        setArticles(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isDeleted, isUpdated, isArticleAdded]);

  const newArticleHandler = async function (e) {
    e.preventDefault();
    try {
      const endPoint = "/articles";

      const response = await Request.post(
        endPoint,
        {
          title: title,
          author: author,
          file: image,
          description: description,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsArticleAdded((state) => !state);
      setIsPopupVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Articles</title>
      </Helmet>

      <Flex>
        {isLoading ? (
          <h2>Loading..</h2>
        ) : articles.length < 1 ? (
          <h2>No Articles</h2>
        ) : (
          articles.map((article) => {
            return (
              <Card style={{ position: "relative" }} key={article._id}>
                <ActionTab
                  id={article._id}
                  dispatch={{
                    changeDeleteState: setIsDeleted,
                    changeUpdateState: setIsUpdated,
                  }}
                />
                <Link
                  to={`/articles/${article._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardTitle>{article.title}</CardTitle>
                </Link>
                <CardImage src={article.imgUrl} />

                <CardDescription content={article.description} />

                <CardFooter date={article.date} author={article.author} />
              </Card>
            );
          })
        )}
      </Flex>
      <div className={style["create_art_btn_wrapper"]}>
        <div className={style["action_wrapper"]}>
          <Button
            className={style["create_art_btn_wrapper__btn"]}
            onClick={(e) => setIsPopupVisible((state) => !state)}
          >
            <IoAddOutline />
          </Button>

          {isPopupVisible && (
            <Wrapper className={style["popup"]}>
              <form encType="multipart/form-data" onSubmit={newArticleHandler}>
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
                  type={"text"}
                  id="author"
                  label="Author"
                  name="author"
                  onChange={(e) => setAuthor(e.target.value)}
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
                <Button className={style["btn_add"]}>Add</Button>
              </form>
            </Wrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
