
import { TweetDTO } from "../../config/services/tweet.service";
import { CardContainer, FlexContainer, IconeStyled, SmallIconeStyled } from "./CardTweetStyle";

interface CardTweetProp {
  tweet: TweetDTO;
  index: number;
  retweet?: TweetDTO;
  iconePerfilUser: string;
  iconePerfil: string | null;
}



export default function CardTweet(props: CardTweetProp) {
  const userAvatarUrl = `https://www.gravatar.com/avatar/${props.iconePerfilUser}?d=robohash`;
  const avatarRetweetUrl = `https://www.gravatar.com/avatar/${props.iconePerfil}?d=robohash`;

  return (
    <CardContainer key={props.index}>
      <FlexContainer>
        <IconeStyled imgurl={userAvatarUrl}></IconeStyled>
        <div>
          <FlexContainer>
            <p style={{ fontSize: "1.3rem", margin: "0" }}>
              <strong>{props.tweet.User.name}</strong>
            </p>
            <p style={{ marginLeft: "10px" }}>{props.tweet.User.username}</p>
          </FlexContainer>

          <p style={{ margin: "0" }}>{props.tweet.content}</p>
        </div>
      </FlexContainer>

      {props.tweet.originalTweet && (
        <div style={{ borderRadius: "10px", border: "1px solid #bbbbbb", padding: "5px", margin: "10px" }}>
          <FlexContainer>
            <SmallIconeStyled imgurl={avatarRetweetUrl}></SmallIconeStyled>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                  <strong>{props.tweet.originalTweet.User.name}</strong>
                </p>
                <p style={{ marginLeft: "10px" }}>{props.tweet.originalTweet.User.username}</p>
              </div>
              <p style={{ margin: "0px" }}>{props.tweet.originalTweet.content}</p>
            </div>
          </FlexContainer>
        </div>
      )}
    </CardContainer>
  );
}
