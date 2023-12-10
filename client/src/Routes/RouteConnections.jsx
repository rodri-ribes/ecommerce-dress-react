import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

//------ protected routes
import ProtectedRouteUserIsLoggedIn from "../ProtectedRoutes/ProtectedRouteUserIsLoggedIn/ProtectedRouteUserIsLoggedIn";
import ProtectedRouteAdmin from "../ProtectedRoutes/ProtectedRouteAdmin/ProtectedRouteAdmin";

//------ hooks
import useQueryUser from "../hooks/user/useQueryUser";

//------ components
import Snipper from "../components/Spinner/Spinner";

//------ pages
import LandingPage from "../pages/LandingPage/LandingPage";
import PageNotFound from "../components/PageNotFound/PageNotFound";

const ContentDetail = lazy(() =>
  import("../pages/ContentDetail/ContentDetail")
);
const AddToCart = lazy(() => import("../pages/AddToCart/AddToCart"));
const ProcessPurchase = lazy(() =>
  import("../pages/ProcessPurchase/ProcessPurchase")
);
const FinalizePurchase = lazy(() =>
  import("../pages/FinalizePurchase/FinalizePurchase")
);
const Products = lazy(() => import("../pages/Products/Products"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));

//------ profile

const Profile = lazy(() => import("../pages/Profile/Profile"));
const Settings = lazy(() =>
  import("../pages/Profile/sub-pages/Settings/Settings")
);
const Favorites = lazy(() =>
  import("../pages/Profile/sub-pages/Favorites/Favorites")
);
const Shopping = lazy(() =>
  import("../pages/Profile/sub-pages/Shopping/Shopping")
);

//------ dashboard

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AddProduct = lazy(() =>
  import("../pages/Dashboard/sub-pages/AddProduct/AddProduct")
);
const ManageProducts = lazy(() =>
  import("../pages/Dashboard/sub-pages/ManageProducts/ManageProducts")
);
const Customers = lazy(() =>
  import("../pages/Dashboard/sub-pages/Customers/Customers")
);
const PageSettings = lazy(() =>
  import("../pages/Dashboard/sub-pages/PageSettings/PageSettings")
);
const CashRegister = lazy(() =>
  import("../pages/Dashboard/sub-pages/CashRegister/CashRegister")
);
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Mails = lazy(() => import("../pages/Dashboard/sub-pages/Mails/Mails"));

export default function RouteConnections() {
  const { user } = useQueryUser();

  return (
    <>
      <Suspense fallback={<Snipper />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/signin"
            element={
              <ProtectedRouteUserIsLoggedIn
                children={<SignIn />}
                user={user}
                action="no_user_exists"
              />
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRouteUserIsLoggedIn
                children={<SignUp />}
                user={user}
                action="no_user_exists"
              />
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRouteUserIsLoggedIn
                children={<Profile />}
                user={user}
                action="user_exists"
              />
            }
          >
            <Route path="settings" element={<Settings />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="shopping" element={<Shopping />} />
          </Route>

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRouteAdmin children={<Dashboard />} user={user} />
            }
          >
            <Route path="add-product" element={<AddProduct />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="customers" element={<Customers />} />
            <Route path="cash-register" element={<CashRegister />} />
            <Route path="settings" element={<PageSettings />} />
            <Route path="mails" element={<Mails />} />
          </Route>

          <Route path="/products" element={<Products />} />

          <Route path="/product/:id" element={<ContentDetail />} />

          <Route
            path="/added-to-cart"
            element={
              <ProtectedRouteUserIsLoggedIn
                children={<AddToCart />}
                user={user}
                action="user_exists"
              />
            }
          />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/process-purchase"
            element={
              <ProtectedRouteUserIsLoggedIn
                children={<ProcessPurchase />}
                user={user}
                action="user_exists"
              />
            }
          />

          <Route
            path="/finalize-purchase/*"
            element={
              <ProtectedRouteUserIsLoggedIn
                children={<FinalizePurchase />}
                user={user}
                action="user_exists"
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
