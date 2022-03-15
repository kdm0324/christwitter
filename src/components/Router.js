import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        /*스위치문을 대신해서 Routes를 쓴다 */
        {isLoggedIn ? (
          <>
            <Route
              exact
              path="/"
              element={
                <div
                  style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Home userObj={userObj} />
                </div>
              }
            ></Route>
            <Route
              exact
              path="/profile"
              element={                <div
                style={{
                  maxWidth: 890,
                  width: "100%",
                  margin: "0 auto",
                  marginTop: 80,
                  display: "flex",
                  justifyContent: "center",
                }}
              > <Profile refreshUser={refreshUser} userObj={userObj} />
              </div>}
            ></Route>
          </> /*조건절 안에 Route 두개를 쓰기 위에 묶어준다. */
        ) : (
          <Route exact path="/" element={<Auth />}></Route>
        )}
        {/* <Route path="*" element={<Navigate to="/" />}/>
        /*Redirect 대신 Navigate를 사용하였는데, Routes의 컴포넌트로는 Navigate가 올 수 없다 */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
