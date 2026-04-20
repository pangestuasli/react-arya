import ErrorPage from "../components/ErrorPages";
export default function Error403() {
    return (
        <ErrorPage
            errorCode={403}
            description="Forbidden — Kamu tidak memiliki izin untuk mengakses halaman ini."
            image="./public/img/eror403.png"
        />
    );
}