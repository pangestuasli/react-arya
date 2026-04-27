export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-6xl font-extrabold text-green-600">404</h1>
            <p className="text-2xl font-semibold mt-4">Page Not Found</p>
            <p className="text-gray-500 mt-2">Halaman yang kamu cari tidak ditemukan.</p>
        </div>
    );
}