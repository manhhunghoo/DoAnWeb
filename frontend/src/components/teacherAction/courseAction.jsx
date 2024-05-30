import { useState } from "react";
import Button from "@mui/material/Button"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import * as CreateCourseForm from "../Form/CreateCourse";

import validator from "../../hook/validate";
import * as videos from '../../service/videos'
import { addDocument } from "../../service/document"
import { Fab } from "@mui/material";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export function AddVideo({ courseID }) {
    validator({
        form: '#add-group-form',
        formGroup: '.form-group',
        errorMessage: '.form-message',
        styleInvalid: 'border-red-500',
        rules: [
            validator.isRequired('#add-video-name', 'nhập trường này'),
            validator.isRequired('#add-video-desrciption', 'Vui lòng nhập mô tả'),
            validator.isRequired('#add-video-title', 'Vui lòng nhập mô tả'),
        ],
        onSubmit: function (data) {
            console.log('from data: ', data);
        }
    }
    )
    const [showForm, setShowForm] = useState(false);
    const [videoLink, setVideoLink] = useState('');

    const handleAddVideo = () => {
        setShowForm(pre => !pre);
    };

    const handleChange = (event) => {
        setVideoLink(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Thêm video vào cơ sở dữ liệu hoặc xử lý theo cách khác
        // Ẩn form sau khi submit
        videos.addVideo(courseID, {
            title: 'video moi',
            url: 'https://www.youtube.com/embed/TLVK0iTDev0?si=8Ld1xnfpQxnNBvBO',
            description: 'hoc react'
        })
            .then(() => {
                alert('them thanh cong')
            })
            .catch(() => {
                alert('them video that bai')
            }
            )
        setShowForm(false);
        setVideoLink('');
    };

    return (
        <>
            <Button
                onClick={handleAddVideo}
                className="hover:bg-red-300 hover"
                variant="contained"
            >
                Thêm video
            </Button>
            {showForm && (
                <form onSubmit={handleSubmit} id='add-group-form' className="bg-white w-[30%]">
                    <div className="form-group border-spacing-3 border-black border-2">
                        <input
                            name="add-video-name"
                            id="add-video-name"
                            type="text"
                            value={videoLink}
                            onChange={handleChange}
                            placeholder="Nhập link video"
                            className="border-black border-2 w-full"
                        />
                        <div className="form-message text-red-700 flex justify-center"></div>
                    </div>
                    <br></br>
                    <div className="form-group border-spacing-3 border-black border-2 w-full">
                        <input type='text' name='add-video-title' placeholder="tiêu đề" id='add-video-title' className="border-black border-2 w-full" />
                        <div className="form-message text-red-700 flex justify-center"></div>
                    </div>
                    <br></br>
                    <div className="form-group border-spacing-3 border-black border-2 w-full">
                        <input type='text' name='add-video-desrciption' placeholder="mô tả" id='add-video-desrciption' className="border-black border-2 w-full"></input>
                        <div className="form-message text-red-700 flex justify-center"></div>
                    </div>
                    <br></br>
                    <div className="w-full flex justify-center">
                        <input type="submit" className="bg-blue-500 hover:bg-blue-700 rounded-lg p-1"></input>
                    </div>
                </form>
            )}
        </>
    );
}


export function AddDocument({ courseID }) {
    const handleAddDocument = (e) => {
        console.log('e', e.target.files[0])
        addDocument(courseID, e.taget.files[0])
            .then(() => {
                alert('them thanh cong')
            })
            .catch(() => {
                alert('them that bai')
            })
    }
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload file
            <VisuallyHiddenInput onChange={handleAddDocument} type="file" />
        </Button>
    )
}

export function AddDealine() {

    return (
        <Button variant="contained" className="hover:bg-red-300 hover">thêm deadline</Button>
    )
}

export const CreateCourse = ({ user, isCourse, isStudy }) => {
    const [showFormCreateCourse, setShowFormCreateCourse] = useState(false)
    const handleCloseFromCreate = () => {
        setShowFormCreateCourse(false)
    }
    const handleOpenFromCreate = () => {
        setShowFormCreateCourse(true)
    }
    return (
        <div className="w-full flex-col md:flex-row flex justify-between">

            <Fab variant="extended" onClick={handleOpenFromCreate} className='bg-[#0077ff] text-white' sx={{ position: 'absolute', top: 130, right: 25 }}>
                Creat Study
            </Fab>

            <Dialog open={showFormCreateCourse} onClose={handleCloseFromCreate} fullWidth={true} maxWidth='md'>
                <DialogTitle>Create Study</DialogTitle>
                <DialogContent>
                    <CreateCourseForm.CreateCourse user={user} isCourse={isCourse} isStudy={isStudy} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFromCreate}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>)
}