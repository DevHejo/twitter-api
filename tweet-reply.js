const { TwitterApi } = require("twitter-api-v2");
const dotenv = require("dotenv");

dotenv.config();

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const client = new TwitterApi({
  appKey: CONSUMER_KEY,
  appSecret: CONSUMER_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_TOKEN_SECRET,
});

const prev_posted_tweet_id_str = "1470251903925719043";

(async () => {
  try {
    await client.v2
      .reply(
        "reply to tweet using package twitter-api-v2, on 14-12-2021 try 4",
        prev_posted_tweet_id_str
      )
      .then((val) => {
        // console.log(`response: ${val} \n`);
        console.log(val);
        const tweet_id = JSON.stringify(val.data.id);
        console.log(tweet_id);
      })
      .catch((err) => {
        console.log(`error while posting reply: ${err}`);
      });
  } catch (e) {
    //
  }
})();
