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
// const prev_posted_tweet_id_str = "1470157804304572420";

client.v2
  .tweets(prev_posted_tweet_id_str, {
    "tweet.fields": [
      "organic_metrics",
      "public_metrics",
      "conversation_id",
      "in_reply_to_user_id",
      "referenced_tweets",
    ],
    expansions: ["author_id", "in_reply_to_user_id", "referenced_tweets.id"],
    "user.fields": ["name", "username"],
  })
  .then((val) => {
    console.log(val);
    console.log("\n");
    console.log(val.data);
    console.log(val.includes.users);
  })
  .catch((err) => {
    console.log(err);
  });
