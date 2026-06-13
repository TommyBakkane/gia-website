import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { releasesQuery, type ReleaseDoc } from "@/sanity/lib/queries";
import "./Releases.css";

export const Releases = async () => {
  const releases = await client.fetch<ReleaseDoc[]>(
    releasesQuery,
    {},
    { next: { revalidate: 60 } },
  );

  const featured = releases.find((r) => r.isFeatured) ?? releases[0];
  const others = releases.filter((r) => r._id !== featured?._id);

  return (
    <section className="releases" id="releases">
      <div className="releases-container">
        <div className="releases-image-section">
          <Image
            src="/releases_image.jpg"
            alt="Latest Release"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="releases-content">
          {featured && (
            <div className="featured-release">
              <h3>{featured.title}</h3>
              <a
                href={featured.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="listen-link"
              >
                Listen Now →
              </a>
            </div>
          )}

          <div className="releases-list">
            {others.map((release) => (
              <a
                key={release._id}
                href={release.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="release-card"
              >
                <div className="release-details">
                  <span className="track-title">{release.title}</span>
                </div>
                <span className="play-icon">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
