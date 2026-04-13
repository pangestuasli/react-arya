export default function DashboardCard({ icon, value, label }) {
    return (
        <div className="dashboard-card">
            <div className="card-icon">{icon}</div>
            <div className="card-info">
                <span className="card-value">{value}</span>
                <span className="card-label">{label}</span>
            </div>
        </div>
    );
}