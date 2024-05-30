import { useState } from "react";
import "../../../Pages/Add.css"
import TinnhanAuth from "../../../Pages/Auth/TinnhanAuth";
import Tinnhanpage from "../../../Pages/Tinnhanpage";

function TinnhanLayout() {
  const [user, setUser] = useState(undefined)

  if (!user) {
    return <TinnhanAuth onAuth={(user) => setUser(user)} />
  } else {
    return <Tinnhanpage user={user} />
  }
}

export default TinnhanLayout