import { useState,createContext } from "react";

export const CurrentVideoContext = createContext();
export const CurrentCourseContext = createContext();
export const CurrentVideoListContext = createContext();
export const CurrentCommentListContext = createContext();
export const CurrentPostListContext = createContext();
export const CurrentNotiListContext = createContext();
export const CurrentItemContext = createContext();

export default function CoursecDetailProvider({children}) {
    const [courseDetails, setCourseDetails] = useState({})
    const [curVideoList, setCurVideoList] = useState([{}])
    const [curPostList, setCurPostList] = useState([{}])
    const [curNotiList, setCurNotiList] = useState([{}])
    const [curItem, setCurItem] = useState({})
    const [curCommentList, setCurCommentList] = useState([{}])
    const [curVideo, setCurVideo] = useState({})
    return (
        <CurrentCourseContext.Provider value={{ courseDetails, setCourseDetails }}>
        <CurrentItemContext.Provider value={{ curItem, setCurItem }} >
          <CurrentCommentListContext.Provider value={{ curCommentList, setCurCommentList }}>
            <CurrentVideoContext.Provider value={{ curVideo, setCurVideo }}>
              <CurrentVideoListContext.Provider value={{ curVideoList, setCurVideoList }}>
                <CurrentPostListContext.Provider value={{ curPostList, setCurPostList }}>
                    <CurrentNotiListContext.Provider value={{ curNotiList, setCurNotiList }}>
                  {children}
                  </CurrentNotiListContext.Provider>
                </CurrentPostListContext.Provider>
              </CurrentVideoListContext.Provider>
            </CurrentVideoContext.Provider>
          </CurrentCommentListContext.Provider>
        </CurrentItemContext.Provider>
      </CurrentCourseContext.Provider>
    )
}