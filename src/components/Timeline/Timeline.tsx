import styled from "styled-components";
import { TweetDTO } from "../../config/services/tweet.service";
import { useEffect, useState } from "react";
import { createLike, deleteLike } from "../../config/services/like.service";
import { UserDto } from "../../config/services/user.service";
import Modal from "../Modal/Modal";
import CardTweet from "../CardTweets/CardTweet";
import { Box, CircularProgress } from "@mui/material";


const BodyTimeline = styled.div`
  border: 2px solid #e0e0e0;
  width: 60%;
`;

const TimeLineStyled = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const HrStyled = styled.hr`
  opacity: 0.5;
  padding: 0;
  margin: 0;
`;

interface TimeLineProp {
  userLogado?: UserDto | null;
  loading?: boolean
  tweets?: TweetDTO[]
}

export default function Timeline(props: TimeLineProp) {
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [openModal, setOpenModal] = useState(false);
  const [tweetModal, setTweetModal] = useState<TweetDTO | undefined>(undefined);
  const [copyTweets, setCopyTweets] = useState<object>({});



  useEffect(() => {

    setUserLogado(props.userLogado);

  }, [copyTweets, props.userLogado, props.loading]);

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

      setTweets(copy);

      const criarLike = await createLike(dataCreate);

      const indexLike = tweets[index].Likes.findIndex((l) => l.userId === userLogado);
      const copy2 = [...tweets];
      copy[index].Likes[indexLike] = {
        id: criarLike.data.id,
        tweetId: criarLike.data.tweetId,
        retweetId: criarLike.data.retweetId,
        userId: criarLike.data.userId,
      };
      setTweets(copy2);

      console.log(criarLike);
    } else {
      const indexLike = tweets[index].Likes.findIndex((l) => l.userId === userLogado!.id);

      const dataToDelete = {
        id: tweets[index].Likes[indexLike].id,
      };

      const copy = [...tweets];
      copy[index].Likes.splice(indexLike, 1);
      setTweets(copy);

      const del = await deleteLike(dataToDelete);

      console.log(del);
    }
  }

  function showModal(tweet: TweetDTO) {
    setTweetModal(tweet);
    setOpenModal(true);
  }

  function hideModal() {
    setOpenModal(false);

    setCopyTweets({
      fakeTweet: "para atualizar o componente",
    });
  }

  return (
    <BodyTimeline>
      {props.loading ? (<>
        <Box sx={{ display: "flex", position: "absolute", left: "43%", top: "50%" }}>
          <CircularProgress />
        </Box>
      </>) :
        <TimeLineStyled>
          {props.tweets &&
            props.tweets.map((t, index) => (
              <div key={index} style={{ padding: "10px 0px 0px 10px" }}>
                <CardTweet iconePerfilUser={t.User.iconePerfil} iconePerfil={t.originalTweet ? t.originalTweet.User.iconePerfil : null} index={index} tweet={t} key={index} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => like(t.id, index)}>
                    <g clipPath="url(#clip0_83_2222)">
                      <path
                        d="M0 3.08429C0.0179879 1.989 0.502097 0.988356 1.59076 0.388938C2.70444 -0.22504 3.80484 -0.0826685 4.84735 0.616248C5.50587 1.05792 5.49726 1.05631 6.13388 0.62919C7.20064 -0.0867132 8.32293 -0.238792 9.45773 0.417251C10.598 1.07572 11.054 2.14836 10.9945 3.46611C10.9445 4.58567 10.4713 5.54102 9.8347 6.41628C8.94469 7.641 7.81145 8.58826 6.56715 9.39395C5.31895 10.2021 5.67636 10.1956 4.45553 9.40771C3.16509 8.5737 1.99666 7.5868 1.08944 6.30546C0.445788 5.39541 0.00625667 4.40366 0 3.08429ZM5.48866 2.9128C5.26968 2.62725 5.1117 2.4145 4.94746 2.20741C4.68077 1.8709 4.37263 1.58616 3.99175 1.38878C2.5754 0.651841 1.11134 1.57402 1.08397 3.21534C1.07067 4.00486 1.34909 4.69326 1.75265 5.33312C2.62702 6.71963 3.86427 7.70005 5.1899 8.57774C5.38308 8.70555 5.56139 8.74196 5.76786 8.60525C7.20299 7.65071 8.5513 6.59991 9.42176 5.03058C9.77917 4.38667 9.98486 3.69908 9.90587 2.94435C9.8128 2.05129 9.25987 1.39363 8.41522 1.18816C7.59716 0.989165 6.92926 1.31355 6.35755 1.87899C6.06115 2.17182 5.81557 2.51966 5.48788 2.9128H5.48866Z"
                        fill={t.Likes.some((l) => l.userId === userLogado!.id) ? "red" : "#828282"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_83_2222">
                        <rect width="11" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p style={{ marginLeft: "5px", marginRight: "8px" }}>{t.Likes.length}</p>

                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => showModal(t)}>
                    <g clipPath="url(#clip0_83_2269)">
                      <path
                        d="M5.48279 10.9956C4.24557 10.9956 3.00749 11.0034 1.77027 10.9931C0.636876 10.9836 0.0597954 10.4413 0.00961455 9.33704C-0.0128803 8.85235 0.0234576 8.36423 0.00096267 7.87954C-0.0198018 7.43181 0.229372 7.36821 0.595347 7.37251C0.941422 7.37681 1.23126 7.38368 1.20011 7.85634C1.17589 8.22587 1.19146 8.5997 1.19838 8.97095C1.21396 9.75813 1.2477 9.80024 2.02723 9.80454C3.49459 9.81227 4.96282 9.80712 6.43017 9.80712C7.32218 9.80712 8.21419 9.81743 9.1062 9.80282C9.73692 9.79251 9.77499 9.74352 9.79576 9.09985C9.8096 8.67188 9.81739 8.2422 9.80181 7.81423C9.78624 7.3897 10.0501 7.37079 10.3642 7.37852C10.6895 7.38626 11.0165 7.35274 10.9992 7.84087C10.9802 8.38313 11.0148 8.92798 10.9854 9.46938C10.9343 10.4242 10.3529 10.9759 9.36749 10.9905C8.07317 11.0094 6.77798 10.9948 5.48279 10.9956Z"
                        fill="#828282"
                      />
                      <path
                        d="M2.07397 3.25197C3.13729 2.20267 4.16427 1.20236 5.17308 0.184861C5.44907 -0.0935768 5.63682 -0.0351393 5.8834 0.214079C6.79098 1.13361 7.6951 2.0583 8.63816 2.94088C9.05431 3.33017 8.74457 3.50205 8.52395 3.76416C8.25747 4.08041 8.04896 4.08127 7.76345 3.77447C7.30231 3.27775 6.80396 2.81541 6.31426 2.33158C6.0573 2.58252 6.14036 2.82314 6.13863 3.03455C6.12911 4.43705 6.13863 5.83955 6.13084 7.24119C6.12738 7.91236 6.03913 7.96736 5.38851 7.94416C5.05455 7.93213 4.93169 7.79892 4.93429 7.47924C4.94121 6.50642 4.93429 5.53361 4.93429 4.55994C4.93429 3.84838 4.93429 3.13681 4.93429 2.44674C4.61936 2.29892 4.52592 2.53611 4.39354 2.65814C4.11841 2.9108 3.85972 3.18064 3.59498 3.44361C3.10182 3.93288 2.59482 3.86872 2.07397 3.25111V3.25197Z"
                        fill="#828282"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_83_2269">
                        <rect width="11" height="11" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p style={{ marginLeft: "5px", marginRight: "8px" }}>{t.retweets ? t.retweets.length : 0}</p>
                </div>
                <HrStyled />
              </div>
            ))}
        </TimeLineStyled>
      }



      <Modal isOpen={openModal} tweet={tweetModal} type="retweet" onClose={() => hideModal()} />
    </BodyTimeline>
  );
}
