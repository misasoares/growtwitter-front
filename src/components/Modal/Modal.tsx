import React, { useEffect } from "react";
import ButtonTweetar from "../../components/Button/Button";
import X from "../../images/X.svg";
import { TweetDTO, create } from "../../config/services/tweet.service";
import { BackgroundStyle, DivCampoTweet, FormStyled, IconeXStyled, ModalStyle, TextAreaContentStyled } from "./Modal.style";
import { createRetweet } from "../../config/services/retweet.service";

interface ModalPrimaryProps {
  isOpen: boolean;
  onClose: () => void;
  type: "tweet" | "retweet";
  tweet: TweetDTO | null;
}

const Modal: React.FC<ModalPrimaryProps> = ({ isOpen, onClose, type, tweet }) => {
  useEffect(() => {
    console.log(tweet);
  }, [tweet]);

  async function criarTweet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (type === "tweet") {
      const tweet = {
        content: e.currentTarget.content.value,
      };

      const resposta = await create(tweet);
      if (resposta.code === 201) {
        onClose();
      }

      alert(resposta.message);
    } else {
      const retweet = {
        content: e.currentTarget.content.value as string,
        tweetId: tweet!.id,
      };
      const resposta = await createRetweet(retweet);

      if (resposta.code === 201) {
        onClose();
      }
    }
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
