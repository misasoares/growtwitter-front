import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Timeline from "../components/Timeline/Timeline";
import { TweetDTO, list } from "../config/services/tweet.service";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState<TweetDTO[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    console.log(loading)

    setLoading(true);
    async function listarTweets() {
      const res = await list();
      setLoading(false);
      if (res.code !== 200) {
        alert("Algo deu errado, atualize a página.");
      }
      setTweets(res.data);
      setLoading(false);
    }
    console.log(tweets)
    listarTweets();
  }, [navigate]);

  return (
    <>
      <Sidebar />
      <Timeline tweets={tweets} />
    </>
  );
}

export default Home;
