import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Error400 from "./pages/Error400";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
export default function App() {
    return (
        <div className="min-h-screen bg-latar font-poppins text-teks">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar />

                <main className="flex-1 p-4 md:p-6 xl:p-8">
                    <Header />

                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/error-400" element={<Error400 />} />
                        <Route path="/error-401" element={<Error401 />} />
                        <Route path="/error-403" element={<Error403 />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}