// Get Tweet objects by ID, using bearer token authentication
// https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/quick-start

const needle = require("needle");
const dotenv = require("dotenv");

dotenv.config();

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.TWITTER_BEARER_TOKEN;
// console.log(token);

const endpointURL = "https://api.twitter.com/2/tweets?ids=";

const prev_posted_tweet_id_str = "1470609776207810566";

async function getRequest() {
  // These are the parameters for the API request
  // specify Tweet IDs to fetch, and any additional fields that are required
  // by default, only the Tweet ID and text are returned
  const params = {
    ids: prev_posted_tweet_id_str,
    "tweet.fields": "lang,author_id,public_metrics,conversation_id,in_reply_to_user_id,referenced_tweets",
    "user.fields": "created_at,name,username",
    expansions: "author_id,in_reply_to_user_id,referenced_tweets.id"
  };

  // this is the HTTP header that adds bearer token authentication
  const res = await needle("get", endpointURL, params, {
    headers: {
      "User-Agent": "v2TweetLookupJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

(async () => {
  try {
    // Make request
    const response = await getRequest();
    console.dir(response, {
      depth: null,
    });
  } catch (e) {
    console.log(`error: ${e}`);
    process.exit(-1);
  }
  process.exit();
})();
