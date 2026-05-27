import Link from 'next/link';
import { HOME_PREDICTION_DIRECTORY } from '@/lib/home-prediction-directory';

/** 首页 SEO 目录：Hero 下、昨晚战绩上 */
export function HomePredictionDirectory() {
  const { title, rows } = HOME_PREDICTION_DIRECTORY;

  return (
    <section className="home-pred-dir" aria-labelledby="home-pred-dir-title">
      <div className="container home-pred-dir__inner">
        <h2 id="home-pred-dir-title" className="home-pred-dir__title">
          {title}
        </h2>
        {rows.map((row) => (
          <div key={row.label} className="home-pred-dir__row">
            <h3 className="home-pred-dir__row-label">{row.label}</h3>
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
      </div>
    </section>
  );
}
