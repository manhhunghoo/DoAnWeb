import React, { useEffect } from "react";
import { registerStudent, registerTeacher } from "../../service/authentic"

import validator from "../../hook/validate";
import useUser from "../../hook/useUser";

const CreateStudent = () => {
    const {user}= useUser()
    useEffect(() => {
        validator({
            form: "#form-create-student",
            formGroup: ".form-group",
            errorMessage: ".form-message",
            styleInvalid: "border-red-500",
            rules: [
                validator.isRequired("#email", "Vui lòng nhập email"),
                // validator.isEmail('#email', 'Email không hợp lệ'),
                validator.isRequired("#password", "Vui lòng nhập mật khẩu"),
                validator.minLength("#password", 6),
                validator.isRequired("#re-password", "Vui lòng nhập lại mật khẩu"),
                validator.isConfirmed("#re-password","#password", "Mật khẩu không khớp"),
                validator.isRequired("#create-username", "Vui lòng nhập username "),
                validator.isRequired("#role-login", "Vui lòng nhập role")
            ],
            onSubmit: function (data) {
                const { email, password, role,username,linkimage } = data;
                if(role === "student"){
                    registerStudent({ email, password, linkimage,username,role,admin:user._id })
                    .then(res => {
                        alert('Đăng kí thành công')
                    })
                    .catch(err => {
                        alert('Đăng kí thất bại')
                        console.log(err)
                    })

                }
                else if(role === "teacher"){
                    registerTeacher({ email, password,linkimage ,role,admin:user._id })
                }
            },
        });
        return () => { };
    }, []);

    return (
        <form id="form-create-student">
            <div className="relative form-group">
                <input
                    className="p-2 rounded-xl border"
                    autoComplete="true"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                />
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="relative form-group">
                <input
                    className="p-2 mt-2 rounded-xl border"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                />
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="relative form-group">
                <input
                    className="p-2 mt-2 rounded-xl border"
                    autoComplete="true"
                    type="password"
                    id="re-password"
                    name="repassword"
                    placeholder="Nhập lại mật khẩu"
                />
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="relative form-group">
                <input
                    className="p-2 mt-2 rounded-xl border"
                    autoComplete="true"
                    type="text"
                    name="username"
                    id="create-username"
                    placeholder="username"
                />
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="relative form-group">
                <input
                    className="p-2 mt-2 rounded-xl border"
                    autoComplete="true"
                    type="url"
                    name="linkimage"
                    id="create-linkimage"
                    placeholder="linkimage"
                />
                <span className="form-message block  text-red-500"></span>
            </div>
            <div className="relative form-group">
                <input
                    className="p-2 mt-2 rounded-xl border"
                    type="text"
                    id="role-login"
                    name="role"
                    placeholder="teacher, student"
                />
                <span className="form-message block  text-red-500"></span>
            </div>
            <button type="submit" className="form-submit bg-[#0077FF] hover:scale-110 mt-6 rounded-lg text-white px-4 py-1 inline-block font-semibold hover:bg-[#2e7bd9] hover:text-white">
                    Đăng kí
            </button>
        </form>
    );
};

export default CreateStudent;
