/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SiteLayout } from "./layouts/SiteLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import SellerDashboard from "./pages/SellerDashboard";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import { useParams } from "react-router-dom";

function ProductPageRedirect() {
  useEffect(() => {
    window.location.replace(`/cart.html${window.location.search}#offers`);
  }, []);

  return null;
}

function ProductRedirect() {
  const { productId } = useParams();

  useEffect(() => {
    const id = productId ? encodeURIComponent(productId) : "1";
    window.location.replace(`/cart?product=${id}`);
  }, [productId]);

  return null;
}

function BelowCartRedirect() {
  useEffect(() => {
    window.location.replace("/cart.html#offers");
  }, []);

  return null;
}

function BelowAgainRedirect() {
  useEffect(() => {
    window.location.replace("/cart.html#about");
  }, []);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:productId" element={<ProductRedirect />} />
          <Route path="/cart" element={<ProductPageRedirect />} />
          <Route path="/cart-items" element={<Cart />} />
          <Route path="/belowcart" element={<BelowCartRedirect />} />
          <Route path="/belowagain" element={<BelowAgainRedirect />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
