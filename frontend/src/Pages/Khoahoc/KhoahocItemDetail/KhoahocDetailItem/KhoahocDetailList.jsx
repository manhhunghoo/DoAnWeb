import React, { useContext, useEffect, useState } from "react";
import * as item from "../../../../service/item";
import { CurrentItemContext } from "../../../../state/CoursecDetailProvider";
import useUser from "../../../../hook/useUser";
import ActionList from "./ActionList";
import { useParams } from "react-router-dom";
import { Box, ListItemButton, ListItemText } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import ListVideo from "../../../../components/CourseDetail/ListVideo";

export default function KhoahocDetailList() {
        const [openedItemId, setOpenedItemId] = useState(null); // Use null to represent no open item
        const { user } = useUser();
        const { setCurItem } = useContext(CurrentItemContext);
        const { curItem } = useContext(CurrentItemContext);
        const { courseId } = useParams();
        const [listItem, setListItem] = useState([]);

        const handleItemClick = (item) => {
                setCurItem(item);
                setOpenedItemId(item.id); // Toggle the open state to the current item's id
        };

        useEffect(() => {
                item
                        .getListItemOfCourse(courseId)
                        .then((res) => {
                                console.log("res list item", res);
                                setListItem(res);
                        })
                        .catch((err) => {
                                console.log("err", err);
                        });
        }, [courseId]);

        return (
                <Box>
                        {listItem.map((item, index) => (
                                <ListItemButton
                                        key={index}
                                        alignItems="flex-start"
                                        onClick={() => handleItemClick(item)}
                                        sx={{
                                                px: 3,
                                                pt: 2.5,
                                                pb: openedItemId === item.id ? 0 : 2.5, // Conditionally set the bottom padding based on the opened state
                                                "&:hover, &:focus": { "& svg": { opacity: openedItemId === item.id ? 1 : 0 } },
                                        }}
                                >
                                        <ListItemButton
                                                sx={{ py: 0, minHeight: 32, color: "black" }}
                                                onClick={() => handleItemClick(item)}
                                        >
                                                <ListItemText
                                                        primary={item.title}
                                                        primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
                                                />
                                                <ListItemText
                                                        primary={item.description}
                                                        primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
                                                />
                                                <ActionList item={item} user={user} />
                                        </ListItemButton>

                                        <KeyboardArrowDown
                                                sx={{
                                                        mr: -1,
                                                        opacity: openedItemId === item.id ? 1 : 0, // Conditionally set the opacity based on the opened state
                                                        transform: openedItemId === item.id ? "rotate(-180deg)" : "rotate(0)",
                                                        transition: "0.2s",
                                                }}
                                        />
                                </ListItemButton>
                        ))}
                        {openedItemId !== null && <ListVideo item={curItem} />}
                </Box>
        );
}