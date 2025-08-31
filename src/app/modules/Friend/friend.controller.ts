import { NextFunction, Request, RequestHandler, Response } from "express";

import AppError from "../../errors/AppError";
import { FriendsGalleryService } from "./friend.galleryService";
import { FriendGetServices_Rem } from "./friend.getService_Rem";
import { FriendModel } from "./friend.model";
import { FriendServices } from "./friend.service";
import { FriendGetServices_RemSort } from "./friend.getService";
// Create Friend
const createFriend: RequestHandler = async (req, res, next) => {
  try {
    const friend = req.body;
    console.log("Friend: ", friend);
    // Call service function to save data in DB
    const result = await FriendServices.createFriendIntoDB(friend);

    res.status(200).json({
      message: "Friend added successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Friends With Remaining
const getAllFriends: RequestHandler = async (req, res, next) => {
  console.log("COme: ");
  try {
    const { ref, search, sort, sortBy, page, limit } = req.query;

    if (!ref || typeof ref !== "string") {
      res.status(400).json({ success: false, message: "ref is required" });
      return;
    }

    const result = await FriendGetServices_Rem.getAllFriends({
      ref,
      name: typeof search === "string" ? search : undefined,
      sort: sort === "asc" || sort === "desc" ? sort : "asc",
      sortBy: sortBy === "name" || sortBy === "date" ? sortBy : "date",
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });

    res.status(200).json({
      message: "Friends retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Friends With Remaining Sort
const getAllFriendsWithRemainSort: RequestHandler = async (req, res) => {
  try {
    const { ref, search, page, limit } = req.query;

    if (!ref || typeof ref !== "string") {
      res.status(400).json({ success: false, message: "ref is required" });
      return;
    }

    const result = await FriendGetServices_RemSort.getAllFriends({
      ref,
      search: typeof search === "string" ? search : undefined,
      page: page && !isNaN(Number(page)) ? Number(page) : 1,
      limit: limit && !isNaN(Number(limit)) ? Number(limit) : 10,
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching friends (remain sort):", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Get All Friend Photos (pagination only)
const getAllFriendPhotos: RequestHandler = async (req, res, next) => {
  try {
    const { ref, page, limit } = req.query;

    if (!ref || typeof ref !== "string") {
      res.status(400).json({ success: false, message: "ref is required" });
      return;
    }

    const result = await FriendsGalleryService.getAllFriendPhotos({
      ref,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });

    res.status(200).json({
      message: "Friend photos retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Friend
const getSingleFriend: RequestHandler = async (req, res, next) => {
  try {
    const friendId = req?.params?.friendId;
    const result = await FriendServices.getSingleFriendFromDB(friendId);

    res.status(200).json({
      message: "Friend retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Delete Friend
const deleteFriend: RequestHandler = async (req, res, next) => {
  try {
    const friendId = req.params.friendId;
    console.log("Friend id for delete: ", friendId);
    const result = await FriendServices.deleteFriendFromDB(friendId);

    res.status(200).json({
      message: "Friend deleted successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update Friend
const updateFriend: RequestHandler = async (req, res, next) => {
  try {
    const friendId = req.params.friendId;
    const friendBody = req?.body;
    const result = await FriendServices.updateFriendFromDB(
      friendId,
      friendBody
    );

    res.status(200).json({
      message: "Friend updated successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const FriendControllers = {
  createFriend,
  getAllFriends,
  getAllFriendPhotos,
  getAllFriendsWithRemainSort,
  getSingleFriend,
  deleteFriend,
  updateFriend,
};
