import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layouts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboards from "../pages/Dashboards";
import Form from "../pages/Form";
import Payment from "../pages/Payment";
import Agencydashboard from "../pages/Agencydashboard";
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/Register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />

          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboards />
              </Layout>
            }
          />
          <Route
            path="/form"
            element={
              <Layout>
                <Form />
              </Layout>
            }
          />
          <Route
            path="/payment"
            element={
              <Layout>
                <Payment />
              </Layout>
            }
          />
            <Route
            path="agency"
            element={
              <Layout>
                <Agencydashboard />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
