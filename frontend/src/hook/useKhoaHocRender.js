import { useContext } from "react"
import { KhoaHocRenderContext } from "../Pages/Khoahocpage"
 const  useKhoaHocRender = () => {
    return useContext(KhoaHocRenderContext)
}

export default useKhoaHocRender