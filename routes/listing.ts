import { response } from "express";

const accessors = require("./../services/accessors");
export const postHandler = async (req: any, res: any, next: any) => {
  if (!req.body.data) {
    return res.status(500).json({ data: "no listing Id" });
  }
  try {
    let response = await accessors.getItemById(req.body.data);
    if (response.length > 0 && response[0].images?.length > 0) {
      const images = await accessors.getPreSignedUrlsForImages(response[0].images, response[0].listingId);
      response[0].images = images;
    }
    res.status(200).json({ data: response.length > 0 ? response[0] : [] });
  } catch (e) {
    console.log(e);

    res.status(500).json({ data: "something went wrong" });
  }
};

export const logoutHandler = async (req: any, res: any, next: any) => {
  req.session.destroy();
  res.status(200).json();
};
