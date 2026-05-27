import type { TodayLiveDirectionUpdates as TodayLiveDirectionUpdatesData } from '@/types/match';

interface TodayLiveDirectionUpdatesProps {
  data: TodayLiveDirectionUpdatesData;
}

/** 首页手机端 · 临场方向更新（桌面隐藏） */
export function TodayLiveDirectionUpdates({ data }: TodayLiveDirectionUpdatesProps) {
  return (
    <section className="home-live-updates" aria-labelledby="home-live-updates-title">
      <div className="container home-live-updates__inner">
        <h2 id="home-live-updates-title" className="home-live-updates__title">
          🔥 临场方向更新
        </h2>
        <ul className="home-live-updates__list">
          {data.items.map((item) => (
            <li key={item.time} className="home-live-updates__card">
              <span className="home-live-updates__time">{item.time}</span>
              <div className="home-live-updates__body">
                <p className="home-live-updates__line">{item.line1}</p>
                <p className="home-live-updates__line home-live-updates__line--sub">
                  {item.line2}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
