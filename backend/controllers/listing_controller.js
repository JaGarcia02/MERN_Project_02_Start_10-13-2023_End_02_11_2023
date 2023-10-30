import Listing from "../models/listing_model.js";
import fs from "fs";
import User from "../models/user_model.js";

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
    imageURLs,
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

export const GetUserListing = async (req, res) => {
  const { id } = req.params;
  try {
    const verify_user = await User.findById({ _id: id });
    if (!verify_user) {
      return res.status(403).json({ system_message: "Unauthorized!" });
    } else {
      const user_lising = await Listing.find({ userRef: verify_user._id });
      return res.status(200).json(user_lising);
    }
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};

export const UpdateListing = async (req, res) => {
  const { id, userRef } = req.params;
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
  } = req.body;
  try {
    const check_listing = await Listing.findById({ _id: id });

    if (check_listing) {
      await Listing.findByIdAndUpdate(
        {
          _id: check_listing._id,
        },
        {
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
        }
      );

      const verify_user = await User.findById({ _id: userRef });
      if (verify_user) {
        const updated_listing = await Listing.find({ userRef: userRef });
        return res.status(200).json({
          system_message: "Listing Updated!",
          payload: updated_listing,
        });
      } else {
        return res.status(404).json({ system_message: "Unauthorized!" });
      }
    } else {
      return res.status(404).json({ system_message: "Listing not found!" });
    }
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};

export const DeleteListing = async (req, res) => {
  const { id, userRef } = req.params;

  try {
    const verify_user = await User.findById({ _id: userRef });
    const check_listing = await Listing.findById({ _id: id });
    if (check_listing && verify_user) {
      await Listing.deleteOne({ _id: id });

      const updated_listing = await Listing.find({ userRef: userRef });
      return res.status(200).json({
        system_message: "Listing Deleted",
        payload: updated_listing,
      });
    } else {
      return res.status(404).json({ system_message: "Listing not found!" });
    }
  } catch (error) {}
  return res.status(500).json({ system_message: error.message });
};

export const GetLstingDetails = async (req, res) => {
  const { id, userRef } = req.params;
  try {
    const verify_user = await User.findById({ _id: userRef });
    const check_listing = await Listing.findById({ _id: id });
    if (check_listing && verify_user) {
      const listing_data = await Listing.findOne({ _id: id });

      return res.status(200).json(listing_data);
    } else {
      return res.status(404).json({ system_message: "Listing not found!" });
    }
  } catch (error) {
    return res.status(500).json({ system_message: error.message });
  }
};
