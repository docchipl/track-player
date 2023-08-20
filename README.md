# @docchi/track-player

A Node.js package to check if players have been removed from video-sharing platforms like CDA, Google Drive, and Sibnet.

![Okładka](https://i.ibb.co/4VfzDT4/1500x500.png)

## Contact

- GitHub: [github.com/ankordii][github]
- Website: [https://docchi.pl/contact][site]
- E-mail: pomoc@docchi.pl

## Installation

[Node.js](https://nodejs.org/en/) required

```bash
npm install @docchi/track-player
```

<br/>

Supported URL's

- CDA - **https://ebd.cda.pl/620x395/115890987a**
- CDA - **https://www.cda.pl/video/115890987a**

- GOOGLE DRIVE - **https://drive.google.com/file/d/0BxZF0Ie-2NRsUjhld2FvYzdsWms/view**
- GOOGLE DRIVE - **https://drive.google.com/file/d/0BxZF0Ie-2NRsUjhld2FvYzdsWms/preview**

- SIBNET - **https://video.sibnet.ru/shell.php?videoid=1546878**

Example:

```js
import Track from "@docchi/track-player";

console.log(
  await Track({
    source: "https://video.sibnet.ru/shell.php?videoid=5128164",
  })
);
```

If available

```json
{
  "status": 200,
  "message": "Source exists"
}
```

# Codes

- 501 - Not supported platform.
- 500 - Something went wrong.

- 410 - Source removed by administrators.
- 429 - Too Many Requests.
- 403 - Request access only video.

- 200 - Source exists.
- 206 - Page loaded, but couldn't verify if source exists.

# Support

<b>IMPORTANT</b>: Help me beeing efficient, please! I am developing in my free time for no money. Contribute to the project by posting complete, structured and helpful issues which I can reproduce quickly without asking for missing information.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://buycoffee.to/docchi)

# License

[MIT](https://github.com/docchipl/track-player/blob/main/LICENSE)

[github]: https://github.com/ankordii
[site]: https://docchi.pl/
