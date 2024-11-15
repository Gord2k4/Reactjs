import { useRoutes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientLayout from "./layouts/ClientLayout";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./layouts/AdminLayout";
import ProductList from "./pages/admin/ProductList";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import Cart from "./pages/Cart";// Import CartProvider
import { CartProvider } from "./contexts/Card";
import Checkout from "./pages/Checkout";

function App() {
  const routeConfig = [
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        { path: "product/list", element: <ProductList /> },
        { path: "product/add", element: <ProductAdd /> },
        { path: "product/edit/:id", element: <ProductEdit /> },
      ],
    },
    {
      path: "",
      element: <ClientLayout />,
      children: [
        { path: "", element: <Homepage /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "carts", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        
      ],
    },
  ];

  const routes = useRoutes(routeConfig);

  return (
    <CartProvider> {/* Bọc toàn bộ ứng dụng trong CartProvider */}
      <main>
        {routes}
        <Toaster />
      </main>
    </CartProvider>
  );
}

export default App;
