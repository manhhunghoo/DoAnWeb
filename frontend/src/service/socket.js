import io from "socket.io-client";
import { API_ROOT } from "../utils/constants";
export const socket = io.connect(API_ROOT);