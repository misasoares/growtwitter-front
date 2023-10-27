import React, { useEffect } from "react";
import ButtonTweetar from "../../components/Button/Button";
import X from "../../images/X.svg";
import { TweetDTO, create } from "../../config/services/tweet.service";
import { BackgroundStyle, DivCampoTweet, FormStyled, IconeXStyled, ModalStyle, TextAreaContentStyled } from "./Modal.style";

interface ModalPrimaryProps {
  isOpen: boolean;
  onClose: () => void;
  type: "tweet" | "retweet";
  tweet?: TweetDTO;
}

const Modal: React.FC<ModalPrimaryProps> = ({ isOpen, onClose, type, tweet }) => {


  useEffect(() => {
    console.log(tweet);
  }, [tweet]);
console.log(tweet)
  async function criarTweet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    
      const tweetCreate = {
        content: e.currentTarget.content.value,
        type:type,
        tweetId: tweet?.id
      };


      const resposta = await create(tweetCreate);
      if (resposta.code === 201) {
        onClose();
      }

      alert(resposta.message);
    
  }
  if (isOpen) {
    return (
      <BackgroundStyle>
        <ModalStyle>
          <IconeXStyled src={X} alt="fechar modal" onClick={onClose} />
          <FormStyled onSubmit={(e) => criarTweet(e)}>
            <label htmlFor="content"></label>

            <TextAreaContentStyled name="content" placeholder={type === "tweet" ? "Digite seu novo tweet" : "Digite seu retweet"} />
            <hr />
            {type === "retweet" && (
              <DivCampoTweet>
                <h3>tweet</h3>
                <p>{tweet?.User.username}</p>
                <p>{tweet?.content}</p>
              </DivCampoTweet>
            )}

            <div style={{ alignSelf: "flex-end" }}>
              <ButtonTweetar type="submit" />
            </div>
          </FormStyled>
        </ModalStyle>
      </BackgroundStyle>
    );
  }

  return null;
};

export default Modal;
