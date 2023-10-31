import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";
import { useEffect, useState } from "react";
import { UserDto, listMe } from "../config/services/user.service";
import { TweetDTO } from "../config/services/tweet.service";

function Home() {
  const [userLogado, setUserLogado] = useState<UserDto | null>();
  const [tweets, setTweets] = useState<TweetDTO[]>([]);

  useEffect(() => {
    async function me() {
      const res = await listMe();
      setUserLogado(res.data);
    }
    me();
  }, []);

  function setarTweets(tweets: TweetDTO[]) {
    setTweets(tweets)
  }

  function addTweet(tweet:TweetDTO){
    setTweets([tweet,...tweets])
  }

  return (
    <>
      <Sidebar  addTweet={addTweet} userLogado={userLogado} />
      <Timeline addTweet={addTweet} tweets={tweets} setarTweets={setarTweets}/>
    </>
  );
}

export default Home;
