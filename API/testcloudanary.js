// testcloudanary.js

import cloudinary from "./Config/cloudinary.js";

cloudinary.api.ping()
  .then(result => console.log(result))
  .catch(err => console.log(err));