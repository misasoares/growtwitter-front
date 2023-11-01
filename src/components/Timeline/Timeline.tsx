import { TweetDTO, list } from "../../config/services/tweet.service";
import { useEffect, useState } from "react";
import { createLike, deleteLike } from "../../config/services/like.service";
import { UserDto, listMe } from "../../config/services/user.service";
import Modal from "../Modal/Modal";
import CardTweet from "../CardTweets/CardTweet";
import { Box, CircularProgress } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ContainerDiv, PTimelineStyled, TimeLineStyled } from "./TimelineStyled";

export const BodyTimeline = styled.div`
  border: 2px solid #e0e0e0;
  width: 60%;
`;

export const HrStyled = styled.hr`
  opacity: 0.5;
  padding: 0;
  margin: 0;
`;

interface TimelineProps{
  tweets : TweetDTO[]
  setarTweets: (tweets:TweetDTO[])=> void
  addTweet: (tweet:TweetDTO)=>void
}

export default function Timeline({tweets, setarTweets, addTweet}:TimelineProps) {
  const navigate = useNavigate();
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [openModal, setOpenModal] = useState(false);
  const [tweetModal, setTweetModal] = useState<TweetDTO | undefined>(undefined);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    setLoading(true);


    async function me() {
      const res = await listMe();
      setUserLogado(res.data);
    }

    async function listarTweets() {
      const res = await list();
      if (res.code !== 200) {
        alert("Algo deu errado, atualize a página.");
      }
      setarTweets(res.data);
      setLoading(false);
    }



    me();
    listarTweets();
  }, []);

  async function like(tweetId: string, index: number) {
    const userLiked = tweets[index].Likes.some((like) => like.userId === userLogado!.id);

    if (!userLiked) {
      const dataCreate = {
        tweetId: tweetId,
      };

      const copy = [...tweets];
      copy[index].Likes.push({
        id: "",
        tweetId: "",
        retweetId: "",
        userId: userLogado!.id,
      });

      setarTweets(copy);

      const criarLike = await createLike(dataCreate);

      const indexLike = tweets![index].Likes.findIndex((l) => l.userId === userLogado);
      const copy2 = [...tweets!];
      copy[index].Likes[indexLike] = {
        id: criarLike.data.id,
        tweetId: criarLike.data.tweetId,
        retweetId: criarLike.data.retweetId,
        userId: criarLike.data.userId,
      };
      setarTweets(copy2);

      console.log(criarLike);
    } else {
      const indexLike = tweets![index].Likes.findIndex((l) => l.userId === userLogado!.id);

      const dataToDelete = {
        id: tweets![index].Likes[indexLike].id,
      };

      const copy = [...tweets!];
      copy[index].Likes.splice(indexLike, 1);
      setarTweets(copy);

      const del = await deleteLike(dataToDelete);

      console.log(del);
    }
  }

  function showModal(tweet: TweetDTO) {
    setTweetModal(tweet);
    setOpenModal(true);
  }

  return (
    <BodyTimeline>
      {loading ? (
        <>
          <Box sx={{ display: "flex", position: "absolute", left: "43%", top: "50%" }}>
            <CircularProgress />
          </Box>
        </>
      ) : (
        <TimeLineStyled>
          <h2>Página inicial</h2>
          {/* fazer acordion para clicar nos tweets e mostrar os retweets de determinado tweet */}
          <HrStyled />
          {tweets &&
            tweets.map((t, index) => (
              <div key={index} style={{ padding: "10px 0px 0px 10px" }}>
                <CardTweet iconePerfilUser={t.User.iconePerfil ? t.User.iconePerfil : ""} iconePerfil={t.originalTweet ? t.originalTweet.User.iconePerfil : ""} index={index} tweet={t} key={index} />
                <ContainerDiv>
                  <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => like(t.id, index)}>
                    <g clipPath="url(#clip0_83_2222)">
                      <path
                        d="M0 3.08429C0.0179879 1.989 0.502097 0.988356 1.59076 0.388938C2.70444 -0.22504 3.80484 -0.0826685 4.84735 0.616248C5.50587 1.05792 5.49726 1.05631 6.13388 0.62919C7.20064 -0.0867132 8.32293 -0.238792 9.45773 0.417251C10.598 1.07572 11.054 2.14836 10.9945 3.46611C10.9445 4.58567 10.4713 5.54102 9.8347 6.41628C8.94469 7.641 7.81145 8.58826 6.56715 9.39395C5.31895 10.2021 5.67636 10.1956 4.45553 9.40771C3.16509 8.5737 1.99666 7.5868 1.08944 6.30546C0.445788 5.39541 0.00625667 4.40366 0 3.08429ZM5.48866 2.9128C5.26968 2.62725 5.1117 2.4145 4.94746 2.20741C4.68077 1.8709 4.37263 1.58616 3.99175 1.38878C2.5754 0.651841 1.11134 1.57402 1.08397 3.21534C1.07067 4.00486 1.34909 4.69326 1.75265 5.33312C2.62702 6.71963 3.86427 7.70005 5.1899 8.57774C5.38308 8.70555 5.56139 8.74196 5.76786 8.60525C7.20299 7.65071 8.5513 6.59991 9.42176 5.03058C9.77917 4.38667 9.98486 3.69908 9.90587 2.94435C9.8128 2.05129 9.25987 1.39363 8.41522 1.18816C7.59716 0.989165 6.92926 1.31355 6.35755 1.87899C6.06115 2.17182 5.81557 2.51966 5.48788 2.9128H5.48866Z"
                        fill={t.Likes.some((l) => l.userId === userLogado?.id) ? "red" : "#828282"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_83_2222">
                        <rect width="11" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <PTimelineStyled>{t.Likes.length}</PTimelineStyled>

                  <svg onClick={() => showModal(t)} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_83_2312)">
                      <path
                        d="M11.7401 6.06477C11.0908 6.66098 10.4776 7.21187 9.87926 7.77834C9.6548 7.99148 9.48911 7.95466 9.28164 7.7571C8.75198 7.25365 8.21596 6.75586 7.66436 6.27648C7.39387 6.0414 7.52132 5.88208 7.70684 5.70364C7.88174 5.53512 8.01486 5.23772 8.32146 5.54928C8.51407 5.74471 8.73145 5.91536 8.92688 6.08884C9.15205 5.93873 9.09824 5.76029 9.09895 5.60805C9.10461 4.47581 9.11099 3.34358 9.09895 2.21205C9.08974 1.32764 8.74136 0.996967 7.83642 0.989178C7.19985 0.983513 6.56257 0.993426 5.926 0.986345C5.37085 0.979972 5.36661 0.970059 5.36236 0.518298C5.35811 0.0452938 5.37652 0.0176783 5.88776 0.0113055C6.61851 0.00280838 7.35067 -0.00639679 8.08071 0.0134297C9.22782 0.0438776 10.0322 0.827733 10.0641 1.98192C10.0952 3.11345 10.0683 4.24568 10.0782 5.37792C10.0804 5.60309 10.0018 5.84809 10.166 6.0499C10.3445 6.07822 10.4245 5.94227 10.5257 5.85588C10.9553 5.48956 11.3601 5.5599 11.7401 6.06689V6.06477Z"
                        fill="#828282"
                      />
                      <path
                        d="M1.4955 1.90687C1.19032 2.05557 1.00763 2.27649 0.807241 2.46909C0.530378 2.73533 0.396549 2.50804 0.244309 2.33597C0.0963184 2.17028 -0.154345 2.02158 0.131015 1.76171C0.705984 1.23914 1.28237 0.71657 1.84813 0.184087C2.0202 0.021934 2.15332 0.0162693 2.3268 0.177714C2.89469 0.708781 3.46541 1.23702 4.04534 1.75463C4.33636 2.01379 4.10198 2.16461 3.94691 2.32464C3.79963 2.47617 3.68421 2.7587 3.39248 2.48538C3.17368 2.28074 2.98179 2.03503 2.70563 1.91678C2.5895 1.98334 2.57817 2.0761 2.57817 2.17099C2.57676 3.39669 2.56047 4.62169 2.5803 5.84739C2.59375 6.66594 2.93576 6.98741 3.76564 7.00653C4.44895 7.02211 5.13225 7.00299 5.81556 7.01503C6.26945 7.02282 6.5102 7.42855 6.30839 7.82296C6.2482 7.94121 6.1342 7.97591 6.01241 7.97591C5.07065 7.97591 4.12464 8.05451 3.18784 7.93342C2.43018 7.83571 1.8106 7.20551 1.66686 6.45068C1.61446 6.17524 1.60667 5.88846 1.60455 5.60735C1.59747 4.61744 1.60667 3.62753 1.59818 2.63833C1.59605 2.41103 1.65978 2.17028 1.49338 1.90829L1.4955 1.90687Z"
                        fill="#828282"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_83_2312">
                        <rect width="11.7401" height="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <PTimelineStyled>{t.retweets ? t.retweets.length : 0}</PTimelineStyled>
                </ContainerDiv>
                <HrStyled />
              </div>
            ))}
        </TimeLineStyled>
      )}

      <Modal addTweet={addTweet} isOpen={openModal} tweet={tweetModal} type="retweet" onClose={() => setOpenModal(false)} />
    </BodyTimeline>
  );
}
