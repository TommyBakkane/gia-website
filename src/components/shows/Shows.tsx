import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { showsQuery, type ShowDoc } from "@/sanity/lib/queries";
import "./Shows.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString("en-US", { month: "short" }),
  };
};

export const Shows = async () => {
  const shows = await client.fetch<ShowDoc[]>(
    showsQuery,
    {},
    { next: { revalidate: 60 } },
  );

  const featuredShow = shows.find((show) => show.isFeatured);
  const upcomingShows = shows.filter((show) => !show.isFeatured);

  return (
    <section className="shows" id="shows">
      <div className="shows-container">
        <div className="shows-content">
          <div className="shows-grid-header">
            <h2>Concerts</h2>
          </div>

          <div className="shows-gigs-section">
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
                  <h3>{featuredShow.venue}</h3>
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
                    key={show._id}
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
                  <div key={show._id} className="show-card">
                    <div className="show-date-small">
                      <span className="date-day">
                        {formatDate(show.date).day}
                      </span>
                      <span className="date-month">
                        {formatDate(show.date).month}
                      </span>
                    </div>
                    <div className="show-details">
                      <h5>{show.venue}</h5>
                      <p className="venue-location">{show.location}</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="shows-image-section">
          <Image
            src="/white3.jpg"
            alt="Live performance"
            className="shows-background-image"
            fill
            sizes="50vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div className="image-overlay-gradient"></div>
        </div>
      </div>
    </section>
  );
};
