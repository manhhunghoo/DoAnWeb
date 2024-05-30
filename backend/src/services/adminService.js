import { slugify } from "~/utils/formatters";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { ObjectId } from "mongodb";
import { postModel } from "~/models/Khoahoc/postModel";
import { baitapModel } from "~/models/Khoahoc/filebainopModel";
import { adminModel } from "~/models/adminModel";

const getDetails = async (adminId) => {
  try {
    const item = await adminModel.getDetails(new ObjectId(adminId));
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, "admin not found!");
    }
    const resItem = cloneDeep(item);
    return resItem;
  } catch (error) {
    throw error;
  }
};
const updateBaitap = async (baitapId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedItem = await postModel.update(baitapId, updateData);

    return updatedItem;
  } catch (error) {
    throw error;
  }
};

export const adminService = {
  getDetails,
  updateBaitap,
};
