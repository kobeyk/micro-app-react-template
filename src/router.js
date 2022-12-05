import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import DefaultRoutes from "./routes/DefaultRoutes";

const AllRoutes = () => {
    return useRoutes([
        {
            path:"/*",
            element:<DefaultRoutes/>
        },
    ])
}
const GlobalRouter=() => {
    return(
        // 接入qiankun和子项目独立运行条件下的baseName的设置
        // <Router basename={window.__POWERED_BY_QIANKUN__ ? "/micro-app-react" : "/"}>
        <Router>
            <AllRoutes/>
        </Router>
    )
}

export default GlobalRouter;