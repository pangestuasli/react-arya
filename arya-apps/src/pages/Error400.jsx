import ErrorPage from "../components/ErrorPages";
export default function Error400() {
    return (
        <ErrorPage
            errorCode={400}
            description="Bad Request — Permintaan yang kamu kirim tidak valid."
            image="./public/img/eror400.png"
        />
    );
}