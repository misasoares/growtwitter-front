// import styled from "styled-components";
// import { TweetDTO } from "../../config/services/tweet.service";

// interface CardTweetProp {
//   tweet: TweetDTO;
//   index: number;
//   retweet?: TweetDTO;
//   iconePerfil: string;
// }

// const IconeStyled = styled.div`
//   width: 70px;
//   height: 70px;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   border-radius: 50%;
//   border: 2px solid #1d9bf0;
//   background-color: #fd924b;
// `;

// const BordaStyled = styled.div`

// `

// export default function CardTweet(props: CardTweetProp) {
//   return (
//     <>
//       <div key={props.index} style={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <IconeStyled>
//             <img src={`https://www.gravatar.com/avatar/${props.iconePerfil}?d=robohash`} alt="icone de usuario" />
//             <BordaStyled></BordaStyled>
//           </IconeStyled>
//           <div style={{ marginLeft: "10px", marginRight: "10px" }}>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <p style={{ fontSize: "1.3rem" }}>
//                 <strong>{props.tweet.User.name}</strong>
//               </p>
//               <p style={{ marginLeft: "10px" }}>{props.tweet.User.username}</p>
//             </div>

//             <p>{props.tweet.content}</p>
//           </div>
//         </div>

//         {props.tweet.originalTweet && (
//           <div style={{ borderRadius: "10px", border: "1px solid #bbbbbb", padding: "5px", margin: "10px" }}>
//             <div style={{ display: "flex" }}>
//               <IconeStyled>
//                 <img src={`https://www.gravatar.com/avatar/${props.tweet.originalTweet.User.iconePerfil}?d=robohash`} alt="icone de usuario" />
//               </IconeStyled>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <p>
//                   <strong>{props.tweet.originalTweet.User.name}</strong>
//                 </p>
//                 <p style={{ marginLeft: "10px" }}>{props.tweet.originalTweet.User.username}</p>
//               </div>
//               <p>{props.tweet.originalTweet.content}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import styled from "styled-components";
import { TweetDTO } from "../../config/services/tweet.service";

interface CardTweetProp {
  tweet: TweetDTO;
  index: number;
  retweet?: TweetDTO;
  iconePerfilUser: string;
  iconePerfil: string | null;
}

const IconeStyled = styled.div<{ imgurl: string }>`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 50%;
  border: 2px solid #1d9bf0;
  background-color: #fd924b;
  background-image: url(${(props) => props.imgurl});
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

const SmallIconeStyled = styled(IconeStyled)`
  width: 50px;
  height: 50px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function CardTweet(props: CardTweetProp) {
  const userAvatarUrl = `https://www.gravatar.com/avatar/${props.iconePerfilUser}?d=robohash`;
  const avatarRetweetUrl = `https://www.gravatar.com/avatar/${props.iconePerfil}?d=robohash`;
console.log(avatarRetweetUrl)
console.log("------------------")
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
