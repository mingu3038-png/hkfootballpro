import Link from 'next/link';
import { HOME_PREDICTION_DIRECTORY } from '@/lib/home-prediction-directory';

/** 首页 SEO 目录：紧凑横向媒体分类导航 */
export function HomePredictionDirectory() {
  const { title, rows } = HOME_PREDICTION_DIRECTORY;

  return (
    <section className="home-pred-dir" aria-labelledby="home-pred-dir-title">
      <div className="home-page__container home-pred-dir__inner">
        <div className="home-pred-dir__bar">
          <h2 id="home-pred-dir-title" className="home-pred-dir__title">
            {title}
          </h2>
          <nav className="home-pred-dir__nav" aria-label={title}>
            {rows.map((row, rowIndex) => (
              <div key={row.label} className="home-pred-dir__group" role="presentation">
                {rowIndex > 0 && <span className="home-pred-dir__divider" aria-hidden />}
                <span className="home-pred-dir__group-label">{row.label}</span>
                <div className="home-pred-dir__track" role="list">
                  {row.items.map((item) => (
                    <Link
                      key={`${row.label}-${item.href}-${item.label}`}
                      href={item.href}
                      className="home-pred-dir__chip"
                      role="listitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
