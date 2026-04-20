export default function ErrorPage({ errorCode, description, image }) {
    return (
        <div id="pageheader-container" style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center", gap: "24px" }}>
            {image && (
                <img src={image} alt={`Error ${errorCode}`} style={{ width: "280px" }} />
            )}
            <span id="page-title" style={{ fontSize: "5rem", color: "#00B074" }}>{errorCode}</span>
            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>{description}</p>
            <a href="/" id="add-button" style={{ textDecoration: "none", padding: "14px 22px", borderRadius: "16px" }}>
                Back to Home
            </a>
        </div>
    );
}