import Listing from "../models/listing_model.js";
import fs from "fs";

export const CreateListing = async (req, res) => {
  const {
    name,
    description,
    address,
    regularPrice,
    discountedPrice,
    bathRooms,
    bedRooms,
    furnished,
    parking,
    type,
    offer,
    userRef,
  } = req.body;
  try {
    fs.rename(
      `../storage/unit_pictures/${req.files.images[0].filename}`,
      `../storage/unit_pictures/${req.files.images[0].filename}.png`,
      (error) => console.log(error)
    );
    const new_listing = await Listing.create({
      name: name,
      description: description,
      address: address,
      regularPrice: regularPrice,
      discountedPrice: discountedPrice,
      bathRooms: bathRooms,
      bedRooms: bedRooms,
      furnished: furnished,
      parking: parking,
      type: type,
      offer: offer,
      imageURLs: `../storage/unit_pictures/${req.files.images[0].filename}.png`,
      userRef: userRef,
    });
    return res.status(201).json(new_listing);
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};
