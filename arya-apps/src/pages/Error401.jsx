import ErrorPage from "../components/ErrorPages";
export default function Error401() {
    return (
        <ErrorPage
            errorCode={401}
            description="Unauthorized — Kamu harus login untuk mengakses halaman ini."
            image="./public/img/eror401.png"
        />
    );
}