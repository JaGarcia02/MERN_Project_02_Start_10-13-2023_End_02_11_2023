import Listing from "../models/listing_model.js";

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
    imageURLs,
    userRef,
  } = req.body;
  try {
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
      imageURLs: imageURLs,
      userRef: userRef,
    });
    return res.status(201).json(new_listing);
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};
