import { TweetDTO } from "../../config/services/tweet.service";

interface CardTweetProp {
  tweet: TweetDTO;
  index: number;
  retweet?: TweetDTO;
}

export default function CardTweet(props: CardTweetProp) {
  return (
    <>
      <div key={props.index}>
       
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "1.3rem" }}>
              <strong>{props.tweet.User.name}</strong>
            </p>
            <p style={{ marginLeft: "10px" }}>{props.tweet.User.username}</p>
          </div>

          <p>{props.tweet.content}</p>
        </div>

        {props.tweet.originalTweet && (
          <div style={{ borderRadius: "10px", border: "1px solid #bbbbbb", padding: "5px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>
                <strong>{Array.isArray(props.tweet) ? props.tweet[0]?.User?.name : props.tweet?.User?.name}</strong>
              </p>
              <p style={{ marginLeft: "10px" }}>{Array.isArray(props.tweet) ? props.tweet[0]?.User.username : props.tweet?.User?.username}</p>
            </div>
            <p>{props.tweet.originalTweet.content}</p>
          </div>
        )}
      </div>
    </>
  );
  
}
