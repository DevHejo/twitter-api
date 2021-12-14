const fs = require("fs");
const path = require("path");
const config = require("./config.js");

const apiClient = config.newClient();
const uploadClient = config.newClient("upload");

const mediaFile = fs.readFileSync(path.join(__dirname, "hello_world.png"));
const base64Image = Buffer.from(mediaFile).toString("base64");

uploadClient
  .post("media/upload", { media_data: base64Image })
  .then((media) => {
    console.log("You successfully uploaded media");
    // console.log(`media data: ${JSON.parse(media)}`);
    console.log(media);

    var media_id = media.media_id_string;
    apiClient
      .post("statuses/update", {
        status: "Hello world! posting image with package twitter-lite, on 13-12-2021 try: 1",
        media_ids: media_id,
      })
      .then((tweet) => {
        console.log("Your image tweet is posted successfully");
        // console.log(`tweet data: ${JSON.parse(tweet)}`);
        console.log(tweet);
      })
      .catch(console.error);
  })
  .catch(console.error);
