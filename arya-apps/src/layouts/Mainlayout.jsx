import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export function MainLayout() {
    return(
         <div className="min-h-screen bg-latar font-poppins text-teks">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar />

                <main className="flex-1 p-4 md:p-6 xl:p-8">
                    <Header />

                    <Outlet/>
                </main>
            </div>
        </div>
    )
}