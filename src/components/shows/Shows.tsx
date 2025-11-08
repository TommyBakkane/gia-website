import "./Shows.css";

interface Show {
  id: string;
  date: Date;
  venue: string;
  location: string;
  ticketLink?: string;
  isFeatured?: boolean;
}

export const Shows = () => {
  const shows: Show[] = [
    {
      id: "1",
      date: new Date("2025-01-23"),
      venue: "Becco",
      location: "Oslo",
      isFeatured: true,
    },
    {
      id: "2",
      date: new Date("2025-04-11"),
      venue: "Pyramiden SALT",
      location: "Oslo",
    },
    {
      id: "3",
      date: new Date("2025-05-23"),
      venue: "Vaktbua",
      location: "Kristiansand",
    },
  ];

  const featuredShow = shows.find((show) => show.isFeatured);
  const upcomingShows = shows.filter((show) => !show.isFeatured);

  const formatDate = (date: Date) => {
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    };
  };

  return (
    <section className="shows" id="shows">
      <div className="shows-container">
        <div className="shows-content">
          {featuredShow && (
            <div className="featured-show">
              <div className="show-date">
                <span className="date-day">
                  {formatDate(featuredShow.date).day}
                </span>
                <span className="date-month">
                  {formatDate(featuredShow.date).month}
                </span>
              </div>
              <div className="show-info">
                <h2>{featuredShow.venue}</h2>
                <p className="show-location">{featuredShow.location}</p>
                {featuredShow.ticketLink && (
                  <a
                    href={featuredShow.ticketLink}
                    className="tickets-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Tickets →
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="shows-grid">
            {upcomingShows.map((show) =>
              show.ticketLink ? (
                <a
                  key={show.id}
                  href={show.ticketLink}
                  className="show-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="show-date-small">
                    <span className="date-day">
                      {formatDate(show.date).day}
                    </span>
                    <span className="date-month">
                      {formatDate(show.date).month}
                    </span>
                  </div>
                  <div className="show-details">
                    <h3>{show.venue}</h3>
                    <p className="venue-location">{show.location}</p>
                  </div>
                  <div className="show-link">→</div>
                </a>
              ) : (
                <div key={show.id} className="show-card">
                  <div className="show-date-small">
                    <span className="date-day">
                      {formatDate(show.date).day}
                    </span>
                    <span className="date-month">
                      {formatDate(show.date).month}
                    </span>
                  </div>
                  <div className="show-details">
                    <h3>{show.venue}</h3>
                    <p className="venue-location">{show.location}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="shows-image-section">
          <img
            src="/white3.jpg"
            alt="Live performance"
            className="shows-background-image"
          />
          <div className="image-overlay-gradient"></div>
        </div>
      </div>
    </section>
  );
};
