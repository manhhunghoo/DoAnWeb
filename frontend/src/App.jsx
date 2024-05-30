import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { publicRoutes, privateRoutes, adminRoutes } from "./Routes"
import DefaultLayout from "./components/Layout/DefaultLayout"
import { createContext, useState } from "react"
import StudentHomePage from "./Pages/Schoolweb/student/StudentHomePage"
import Dangnhappage from "./Pages/Dangnhappage"
import StudentDashboard from "./Pages/Schoolweb/student/StudentDashboard"
import PageNotFound from "./Pages/PageNotFound"
import { getUserInLocalStorage } from "./hook/useCheckLogin"
import NotificationEvent from "./state/NotificationEvent"
export const UserContext = createContext()
function App() {

  const [user, setUser] = useState(getUserInLocalStorage)
  console.log('user', user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NotificationEvent>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {  // là các page không đăng nhập vẫn vô đc
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) { // nếu có layout thì gán layout
                Layout = route.layout
              } else if (route.layout === null) {  // nếu không có layout thì gán layout = Fragment
                Layout = route.Fragment
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      {<Page />}
                    </Layout>
                  }
                />
              )
            })}
            {privateRoutes.map((route, index) => {  // là các page kh dang nhap khong vo dc}
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = route.Fragment
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    user ? (
                      <Layout>
                        {<Page />}
                      </Layout>
                    ) : (
                      <Dangnhappage />
                    )
                  }
                />
              )
            })}
            <Route path="/Student/dashboard" element={<StudentDashboard />}>
            </Route>

            <Route path="/*" element={<PageNotFound />} />

            {adminRoutes.map((route, index) => {  // là các page không đăng nhập vẫn vô đc
              const Page = route.component
              let Layout = DefaultLayout
              if (route.layout) { // nếu có layout thì gán layout
                Layout = route.layout
              } else if (route.layout === null) {  // nếu không có layout thì gán layout = Fragment
                Layout = route.Fragment
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    user ? (
                      <Layout>
                        {<Page />}
                      </Layout>
                    ) : (
                      <Dangnhappage />
                    )
                  }
                />
              )
            })}

          </Routes>
        </Router>
      </NotificationEvent>
    </UserContext.Provider>
  )
}

export default App