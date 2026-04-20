export default function PageHeader({ title, breadcrumb, children }) {
    const crumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

    return (
        <div id="pageheader-container">
            <div id="pageheader-left">
                <span id="page-title">{title}</span>
                <div id="breadcrumb-links">
                    {crumbs.map((crumb, index) => (
                        <span key={index} style={{ display: "contents" }}>
                            {index > 0 && <span id="breadcrumb-separator">/</span>}
                            <span id={index === 0 ? "breadcrumb-home" : "breadcrumb-current"}>
                                {crumb}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}