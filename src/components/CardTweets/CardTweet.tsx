import { TweetDTO } from "../../config/services/tweet.service";
import { CardContainer, FlexContainer, IconeStyled, SmallIconeStyled } from "./CardTweetStyle";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Box } from "@mui/material";

interface CardTweetProp {
  tweet: TweetDTO;
  index: number;
  retweet?: TweetDTO;
  iconePerfilUser: string;
  iconePerfil: string | null;
}

export default function CardTweet(props: CardTweetProp) {
  const userAvatarUrl = props.iconePerfilUser ? `https://www.gravatar.com/avatar/${props.iconePerfilUser}?d=robohash` : `https://www.gravatar.com/avatar/blank`;
  const avatarRetweetUrl = props.iconePerfil ? `https://www.gravatar.com/avatar/${props.iconePerfil}?d=robohash` : `https://www.gravatar.com/avatar/blank`;
  console.log("retweets = ", props.tweet);


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



{/* <div>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <CardContainer>
    
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
        <div style={{width:'100%', borderRadius: "10px", border: "1px solid #bbbbbb", padding: "5px", margin: "10px" }}>
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
        </AccordionSummary>
          {props.tweet.retweets && (
        <AccordionDetails>
            {props.tweet.retweets.map((r,index)=>(
              <div key={index}>
                <p><strong>{r.userId}</strong></p>
                <p>{r.content}</p>
              </div>
            ))}
        </AccordionDetails>
          )}
      </Accordion>
    </div>
  );
} */}
