export interface Track {
  title: string;
  artist: string;
  url: string;
}

const BASE_URL = "https://s3.axolotl.cloud/dennispham-me/guitar";

export const tracks: Track[] = [
  {
    title: "Orange",
    artist: "7!!",
    url: `${BASE_URL}/orange_7!!.mp3`,
  },
  {
    title: "drunk",
    artist: "keshi",
    url: `${BASE_URL}/drunk_keshi.mp3`,
  },
  {
    title: "blue",
    artist: "yung kai",
    url: `${BASE_URL}/blue_yung-kai.mp3`,
  },
  {
    title: "I'm Yours",
    artist: "Jason Mraz",
    url: `${BASE_URL}/im-yours_jason-mraz.mp3`,
  },
  {
    title: "Photograph",
    artist: "Ed Sheeran",
    url: `${BASE_URL}/photograph_ed-sheeran.mp3`,
  },
  {
    title: "Always With Me",
    artist: "Youmi Kimura",
    url: `${BASE_URL}/always-with-me_youmi-kimura.mp3`,
  },
  {
    title: "Let It Be",
    artist: "The Beatles",
    url: `${BASE_URL}/let-it-be_the-beatles.mp3`,
  },
  {
    title: "You've Got a Friend in Me",
    artist: "Randy Newman",
    url: `${BASE_URL}/youve-got-a-friend-in-me_randy-newman.mp3`,
  },
  {
    title: "Good Time",
    artist: "Owl City & Carly Rae Jepsen",
    url: `${BASE_URL}/good-time_owl-city_carly-rae-jepsen.mp3`,
  },
  {
    title: "Circles",
    artist: "Post Malone",
    url: `${BASE_URL}/circles_post-malone.mp3`,
  },
  {
    title: "Cupid",
    artist: "FIFTY FIFTY",
    url: `${BASE_URL}/cupid_fifty-fifty.mp3`,
  },
  {
    title: "Santa Baby",
    artist: "Eartha Kitt",
    url: `${BASE_URL}/santa-baby_eartha-kitt.mp3`,
  },
  {
    title: "Winter Wonderland",
    artist: "Bing Crosby",
    url: `${BASE_URL}/winter-wonderland_bing-crosby.mp3`,
  },
  {
    title: "Oogway Ascends",
    artist: "Hans Zimmer & John Powell",
    url: `${BASE_URL}/oogway-ascends_hans-zimmer_john-powell.mp3`,
  },
  {
    title: "Anytime Anywhere",
    artist: "milet",
    url: `${BASE_URL}/anytime-anywhere_milet.mp3`,
  },
];
