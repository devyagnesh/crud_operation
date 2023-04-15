import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Request from "../../api/Request";
import Card from "../../Components/Card/Card";
import CardTitle from "../../Components/CardTitle/CardTitle";
import CardImage from "../../Components/CardImage/CardImage";
import CardDescription from "../../Components/CardDescription/CardDescription";
import CardFooter from "../../Components/CardFooter/CardFooter";
import Flex from "../../Layouts/Flex/Flex";

function Article() {
  const [article, setArticle] = useState({});
  const { id } = useParams();

  useEffect(() => {
    (async function () {
      try {
        const endPoint = `/articles/${id}`;
        const response = await Request.get(endPoint);
        setArticle(response?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  return (
    <Flex>
      <Card style={{ position: "relative" }} key={article._id}>
        <CardTitle>{article.title}</CardTitle>

        <CardImage src={article.imgUrl} />

        <CardDescription content={article.description} />

        <CardFooter date={article.date} author={article.author} />
      </Card>
    </Flex>
  );
}

export default Article;
